import React, { useState } from 'react';
import { TEAMS_IMAGES, TEAM_GRADIENTS, SPORTS_CONFIG, AVAILABLE_TEAMS } from '../data/sportsConfig';
import type { SportConfig } from '../data/sportsConfig';
import { useSupabase } from '../hooks/useSupabase';
import { useCustomEvents } from '../hooks/useCustomEvents';

interface ScoreboardProps {
  sport: SportConfig;
  onBack: () => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ sport, onBack }) => {
  const customEvents = useCustomEvents(sport.id);
  const allEvents = [...sport.events, ...customEvents];
  
  const [activeEvent, setActiveEvent] = useState(allEvents[0]?.id || '');
  const currentEvent = allEvents.find(e => e.id === activeEvent);
  
  const { data, loading } = useSupabase(sport.id, activeEvent, currentEvent?.tableType || 'matches');

  

  const getTeamImage = (teamName: string) => {
    return TEAMS_IMAGES[teamName?.toUpperCase()] || "";
  };

  const renderRankingTable = () => {
    return (
      <table className="results-table">
        <thead>
          <tr>
            <th colSpan={4}>{currentEvent?.name}</th>
          </tr>
          <tr>
            <th>Posição</th>
            <th>Atleta</th>
            <th>Tempo / Marca</th>
            <th>Equipe</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const gradient = TEAM_GRADIENTS[item.team?.toUpperCase()];
            return (
              <tr 
                key={index} 
                style={gradient ? { backgroundImage: gradient, color: 'white' } : {}}
              >
                <td>{item.position}º</td>
                <td>{item.athlete}</td>
                <td>{item.time_mark || '-'}</td>
                <td>
                  {getTeamImage(item.team) ? (
                    <img src={getTeamImage(item.team)} alt={item.team} title={item.team} />
                  ) : (
                    item.team
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderMatchesTable = () => {
    return (
      <table className="results-table">
        <thead>
          <tr>
            <th colSpan={3}>Partidas - {currentEvent?.name}</th>
          </tr>
          <tr>
            <th>Jogo</th>
            <th>Confronto</th>
            <th>Placar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="match-number">{item.match_number}</td>
              <td className="match-teams">
                {getTeamImage(item.team1) ? (
                  <img src={getTeamImage(item.team1)} alt={item.team1} />
                ) : (
                  <span>{item.team1}</span>
                )}
                <span className="vs-text">vs</span>
                {getTeamImage(item.team2) ? (
                  <img src={getTeamImage(item.team2)} alt={item.team2} />
                ) : (
                  <span>{item.team2}</span>
                )}
              </td>
              <td className="score-cell">
                {item.score1} x {item.score2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderMedalsTable = () => {
    if (sport.id === 'geral') {
      const sportsList = SPORTS_CONFIG.filter(s => s.id !== 'geral');
      const teamsList = AVAILABLE_TEAMS.filter(t => t);
      
      const teamScores = teamsList.map(team => {
        let totalPoints = 0;
        const resultsBySport: any = {};
        
        sportsList.forEach(s => {
          const sportMedals = data.filter(m => m.sport_id === s.id && m.team === team);
          let sportPoints = 0;
          let bestPosition = 99;
          sportMedals.forEach(m => {
            sportPoints += m.points || 0;
            if (m.position < bestPosition) bestPosition = m.position;
          });
          totalPoints += sportPoints;
          resultsBySport[s.id] = bestPosition === 99 ? null : bestPosition;
        });
        
        return { team, totalPoints, resultsBySport };
      }).sort((a, b) => b.totalPoints - a.totalPoints);

      return (
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table className="results-table" style={{ whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', paddingLeft: '15px' }}>Equipe</th>
                {sportsList.map(s => (
                  <th key={s.id} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: '120px', padding: '10px 5px', fontSize: '14px' }}>
                    {s.name}
                  </th>
                ))}
                <th>Total Pts</th>
              </tr>
            </thead>
            <tbody>
              {teamScores.map(ts => (
                <tr key={ts.team}>
                  <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                    {getTeamImage(ts.team) ? <img src={getTeamImage(ts.team)} alt={ts.team} style={{ height: '40px', verticalAlign: 'middle', marginRight: '10px' }} /> : ts.team}
                    <span style={{ fontWeight: 'bold' }}>{ts.team}</span>
                  </td>
                  {sportsList.map(s => {
                    const pos = ts.resultsBySport[s.id];
                    return (
                      <td key={s.id} style={{ fontSize: '20px' }}>
                        {pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : pos === 4 ? '4º' : '-'}
                      </td>
                    );
                  })}
                  <td style={{ fontWeight: 'bold', fontSize: '20px' }}>{ts.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <table className="results-table">
          <thead>
            <tr>
              <th colSpan={3}>Resultados - {currentEvent?.name}</th>
            </tr>
            <tr>
              <th>Colocação</th>
              <th>Equipe</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ fontSize: '24px' }}>
                  {item.position === 1 ? '🥇 1º' : item.position === 2 ? '🥈 2º' : item.position === 3 ? '🥉 3º' : '4º'}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    {getTeamImage(item.team) && <img src={getTeamImage(item.team)} alt={item.team} style={{ height: '40px' }} />}
                    <span>{item.team}</span>
                  </div>
                </td>
                <td style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.points} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="app-container">
      <button className="back-button" onClick={onBack}>
        ← Voltar
      </button>

      <div className="header">
        <img src={sport.icon} alt={sport.name} />
        <h1>{sport.name} - Resultados</h1>
      </div>

      <div className="view-switch">
        {allEvents.map(event => (
          <button
            key={event.id}
            className={activeEvent === event.id ? 'active' : ''}
            onClick={() => setActiveEvent(event.id)}
          >
            {event.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Carregando Resultados...</div>
      ) : (
        <div className="table-container">
          {currentEvent?.tableType === 'matches' && renderMatchesTable()}
          {currentEvent?.tableType === 'ranking' && renderRankingTable()}
          {currentEvent?.tableType === 'medals' && renderMedalsTable()}
        </div>
      )}
    </div>
  );
};
