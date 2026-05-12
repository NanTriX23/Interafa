import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SPORTS_CONFIG, AVAILABLE_TEAMS } from '../data/sportsConfig';
import { useSupabase } from '../hooks/useSupabase';
import { useCustomEvents } from '../hooks/useCustomEvents';
import { supabase } from '../lib/supabase';

export const AdminPanel = () => {
  const [selectedSportId, setSelectedSportId] = useState(SPORTS_CONFIG[2].id); // Default to basquete
  const sport = SPORTS_CONFIG.find(s => s.id === selectedSportId);
  const [selectedEventId, setSelectedEventId] = useState(sport?.events[0]?.id || '');
  
  const customEvents = useCustomEvents(selectedSportId);
  const allEvents = sport ? [...sport.events, ...customEvents] : [];
  
  const currentEvent = allEvents.find(e => e.id === selectedEventId);
  const { data, loading } = useSupabase(selectedSportId, selectedEventId, currentEvent?.tableType || 'matches');

  const [newCustomEvent, setNewCustomEvent] = useState({ name: '', table_type: 'ranking' });

  const handleAddCustomEvent = async () => {
    if (!newCustomEvent.name) return alert('Digite o nome da modalidade');
    const { error } = await supabase.from('custom_events').insert({
      sport_id: selectedSportId,
      name: newCustomEvent.name,
      table_type: newCustomEvent.table_type
    });
    if (error) alert('Erro ao criar modalidade: ' + error.message);
    else {
      alert('Modalidade criada com sucesso!');
      setNewCustomEvent({ name: '', table_type: 'ranking' });
    }
  };

  // Forms states
  const [newMatch, setNewMatch] = useState({ match_number: 'Jogo 1', team1: '', team2: '' });
  const [newRank, setNewRank] = useState({ position: 1, athlete: '', team: '', time_mark: '' });
  const [newMedal, setNewMedal] = useState({ team: '', position: 1, points: 4 });

  // Auto update points when position changes
  const handleMedalPosChange = (pos: number) => {
    let pts = 0;
    if (pos === 1) pts = 4;
    else if (pos === 2) pts = 3;
    else if (pos === 3) pts = 2;
    else if (pos === 4) pts = 1;
    setNewMedal({ ...newMedal, position: pos, points: pts });
  };

  const handleUpdateScore = async (id: string, field: 'score1' | 'score2', currentScore: number, change: number) => {
    const newScore = Math.max(0, currentScore + change);
    const { error } = await supabase.from('matches').update({ [field]: newScore }).eq('id', id);
    if (error) alert('Erro ao atualizar placar: ' + error.message);
  };

  const handleAddMatch = async () => {
    if (!newMatch.team1 || !newMatch.team2) return alert('Preencha os times');
    const { error } = await supabase.from('matches').insert({
      sport_id: selectedSportId,
      event_id: selectedEventId,
      ...newMatch
    });
    if (error) {
      alert('Erro ao adicionar partida: ' + error.message);
      return;
    }
    setNewMatch({ match_number: '', team1: '', team2: '' });
  };

  const handleDeleteMatch = async (id: string) => {
    if (window.confirm('Tem certeza?')) {
      const { error } = await supabase.from('matches').delete().eq('id', id);
      if (error) alert('Erro ao excluir: ' + error.message);
    }
  };

  const handleAddRank = async () => {
    if (!newRank.athlete) return alert('Preencha o atleta');
    const { error } = await supabase.from('rankings').insert({
      sport_id: selectedSportId,
      event_id: selectedEventId,
      ...newRank
    });
    if (error) {
      alert('Erro ao adicionar resultado: ' + error.message);
      return;
    }
    setNewRank({ position: newRank.position + 1, athlete: '', team: '', time_mark: '' });
  };

  const handleDeleteRank = async (id: string) => {
    if (window.confirm('Tem certeza?')) {
      const { error } = await supabase.from('rankings').delete().eq('id', id);
      if (error) alert('Erro ao excluir: ' + error.message);
    }
  };

  const handleAddMedal = async () => {
    if (!newMedal.team) return alert('Selecione a equipe');
    const { error } = await supabase.from('medals').insert({
      sport_id: selectedSportId,
      event_id: selectedEventId,
      ...newMedal
    });
    if (error) {
      alert('Erro ao adicionar medalha: ' + error.message);
      return;
    }
    handleMedalPosChange(newMedal.position + 1); // auto increment position
    setNewMedal(prev => ({ ...prev, team: '' }));
  };

  const handleDeleteMedal = async (id: string) => {
    if (window.confirm('Tem certeza?')) {
      const { error } = await supabase.from('medals').delete().eq('id', id);
      if (error) alert('Erro ao excluir: ' + error.message);
    }
  };

  return (
    <div className="app-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="header" style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Painel Admin</h1>
        <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>Ver Placar Público</Link>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select 
          value={selectedSportId} 
          onChange={e => {
            setSelectedSportId(e.target.value);
            const s = SPORTS_CONFIG.find(x => x.id === e.target.value);
            setSelectedEventId(s?.events[0]?.id || '');
          }}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', flex: 1 }}
        >
          {SPORTS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <select 
          value={selectedEventId} 
          onChange={e => setSelectedEventId(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', flex: 1 }}
        >
          {allEvents.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
      </div>

      {/* CREATE NEW MODALITY */}
      <div style={{ background: '#111', color: 'white', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #333' }}>
        <h3 style={{ marginTop: 0 }}>➕ Adicionar Nova Modalidade (Customizada)</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            placeholder="Nome (Ex: 50m Borboleta)" 
            value={newCustomEvent.name} 
            onChange={e => setNewCustomEvent({...newCustomEvent, name: e.target.value})} 
            style={{ padding: '8px', borderRadius: '4px', flex: 1 }} 
          />
          <select 
            value={newCustomEvent.table_type} 
            onChange={e => setNewCustomEvent({...newCustomEvent, table_type: e.target.value})} 
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="ranking">Ranking (Tempo/Marca/Notas)</option>
            <option value="matches">Confrontos / Partidas (1x1)</option>
          </select>
          <button onClick={handleAddCustomEvent} style={{ background: '#3b82f6', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', border: 'none', color: 'white', fontWeight: 'bold' }}>
            Criar Modalidade
          </button>
        </div>
      </div>

      <div style={{ background: '#222', color: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2>Gerenciar {currentEvent?.name}</h2>
        {loading && <p>Carregando...</p>}
        
        {/* MATCHES MANAGER */}
        {currentEvent?.tableType === 'matches' && (
          <div>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input placeholder="Ex: Jogo 1, Quartas..." value={newMatch.match_number} onChange={e => setNewMatch({...newMatch, match_number: e.target.value})} style={{ padding: '8px', borderRadius: '4px' }} />
              
              <input list="teams-list" placeholder="Time ou Atleta 1" value={newMatch.team1} onChange={e => setNewMatch({...newMatch, team1: e.target.value})} style={{ padding: '8px', borderRadius: '4px' }} />
              <input list="teams-list" placeholder="Time ou Atleta 2" value={newMatch.team2} onChange={e => setNewMatch({...newMatch, team2: e.target.value})} style={{ padding: '8px', borderRadius: '4px' }} />
              
              <datalist id="teams-list">
                {AVAILABLE_TEAMS.filter(t => t).map(t => <option key={t} value={t} />)}
              </datalist>
              
              <button onClick={handleAddMatch} style={{ background: '#00A86B', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', border: 'none', color: 'white', fontWeight: 'bold' }}>Adicionar Partida</button>
            </div>

            {data.map(match => (
              <div key={match.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#333', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <strong>{match.match_number}</strong>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 2, justifyContent: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>{match.team1}</div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => handleUpdateScore(match.id, 'score1', match.score1, -1)} style={{ width: '30px', height: '30px', borderRadius: '15px', border: 'none', background: '#555', color: 'white', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                      <span style={{ fontSize: '24px', fontWeight: 'bold', width: '30px', textAlign: 'center', color: 'white' }}>{match.score1}</span>
                      <button onClick={() => handleUpdateScore(match.id, 'score1', match.score1, 1)} style={{ width: '30px', height: '30px', borderRadius: '15px', border: 'none', background: '#555', color: 'white', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                  </div>

                  <span>X</span>

                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>{match.team2}</div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => handleUpdateScore(match.id, 'score2', match.score2, -1)} style={{ width: '30px', height: '30px', borderRadius: '15px', border: 'none', background: '#555', color: 'white', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                      <span style={{ fontSize: '24px', fontWeight: 'bold', width: '30px', textAlign: 'center', color: 'white' }}>{match.score2}</span>
                      <button onClick={() => handleUpdateScore(match.id, 'score2', match.score2, 1)} style={{ width: '30px', height: '30px', borderRadius: '15px', border: 'none', background: '#555', color: 'white', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                  </div>
                </div>

                <div>
                  <button onClick={() => handleDeleteMatch(match.id)} style={{ background: '#cc0000', padding: '5px 10px', fontSize: '12px' }}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RANKINGS MANAGER */}
        {currentEvent?.tableType === 'ranking' && (
          <div>
             <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input type="number" placeholder="Pos" style={{ width: '60px', padding: '8px' }} value={newRank.position} onChange={e => setNewRank({...newRank, position: parseInt(e.target.value)})} />
              <input placeholder="Nome do Atleta" style={{ padding: '8px' }} value={newRank.athlete} onChange={e => setNewRank({...newRank, athlete: e.target.value})} />
              
              <select value={newRank.team} onChange={e => setNewRank({...newRank, team: e.target.value})} style={{ padding: '8px', borderRadius: '4px' }}>
                <option value="">Esquadrão/Equipe</option>
                {AVAILABLE_TEAMS.filter(t => t).map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <input placeholder="Marca (Ex: 10s)" style={{ width: '100px', padding: '8px' }} value={newRank.time_mark} onChange={e => setNewRank({...newRank, time_mark: e.target.value})} />
              <button onClick={handleAddRank} style={{ background: '#00A86B', padding: '8px 16px', borderRadius: '4px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Adicionar Resultado</button>
            </div>

            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Atleta</th>
                  <th>Equipe</th>
                  <th>Marca</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map(rank => (
                  <tr key={rank.id} style={{ borderBottom: '1px solid #444' }}>
                    <td style={{ padding: '10px' }}>{rank.position}º</td>
                    <td>{rank.athlete}</td>
                    <td>{rank.team}</td>
                    <td>{rank.time_mark}</td>
                    <td><button onClick={() => handleDeleteRank(rank.id)} style={{ background: '#cc0000', padding: '2px 8px', fontSize: '12px' }}>X</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* MEDALS MANAGER */}
        {currentEvent?.tableType === 'medals' && (
          <div>
            {selectedSportId === 'geral' ? (
              <div style={{ padding: '20px', background: '#333', color: 'white', borderRadius: '8px' }}>
                <p>🏆 <strong>Quadro Geral:</strong> O quadro geral é calculado automaticamente baseado nas medalhas registradas dentro de cada esporte.</p>
                <p>Para adicionar resultados, selecione o esporte (Ex: Natação, Atletismo) e registre as colocações lá.</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <select value={newMedal.position} onChange={e => handleMedalPosChange(parseInt(e.target.value))} style={{ padding: '8px', borderRadius: '4px' }}>
                    <option value={1}>1º Lugar (🥇)</option>
                    <option value={2}>2º Lugar (🥈)</option>
                    <option value={3}>3º Lugar (🥉)</option>
                    <option value={4}>4º Lugar</option>
                  </select>

                  <input list="teams-list" placeholder="Equipe" value={newMedal.team} onChange={e => setNewMedal({...newMedal, team: e.target.value})} style={{ padding: '8px', borderRadius: '4px' }} />
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>Pontos:</span>
                    <input type="number" value={newMedal.points} onChange={e => setNewMedal({...newMedal, points: parseInt(e.target.value)})} style={{ width: '60px', padding: '8px', borderRadius: '4px' }} />
                  </div>

                  <button onClick={handleAddMedal} style={{ background: '#00A86B', padding: '8px 16px', borderRadius: '4px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Registrar Colocação</button>
                </div>

                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Colocação</th>
                      <th>Equipe</th>
                      <th>Pontos</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(medal => (
                      <tr key={medal.id} style={{ borderBottom: '1px solid #444' }}>
                        <td style={{ padding: '10px', fontSize: '18px' }}>
                          {medal.position === 1 ? '🥇 1º' : medal.position === 2 ? '🥈 2º' : medal.position === 3 ? '🥉 3º' : '4º'}
                        </td>
                        <td>{medal.team}</td>
                        <td>{medal.points} pts</td>
                        <td><button onClick={() => handleDeleteMedal(medal.id)} style={{ background: '#cc0000', padding: '2px 8px', fontSize: '12px' }}>X</button></td>
                      </tr>
                    ))}
                    {data.length === 0 && (
                      <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>Nenhum resultado registrado ainda.</td></tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
