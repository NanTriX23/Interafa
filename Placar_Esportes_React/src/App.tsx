import { Routes, Route, useSearchParams } from 'react-router-dom';
import { SPORTS_CONFIG } from './data/sportsConfig';
import { Scoreboard } from './components/Scoreboard';
import { AdminPanel } from './pages/AdminPanel';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sportParam = searchParams.get('esporte') || searchParams.get('sport');
  
  const selectedSport = sportParam 
    ? SPORTS_CONFIG.find(s => s.id.toLowerCase() === sportParam.toLowerCase())
    : null;

  if (selectedSport) {
    return (
      <Scoreboard 
        sport={selectedSport} 
        onBack={() => {
          searchParams.delete('esporte');
          setSearchParams(searchParams);
        }} 
      />
    );
  }

  return (
    <div className="app-container">
      <div className="header" style={{ justifyContent: 'center', marginBottom: '50px' }}>
        <h1>Painel de Esportes - INTERAFA</h1>
      </div>
      
      <div className="sport-grid">
        {SPORTS_CONFIG.map(sport => (
          <div 
            key={sport.id} 
            className="sport-card"
            onClick={() => {
              setSearchParams({ esporte: sport.id });
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src={sport.icon} alt={sport.name} />
            <h2>{sport.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
