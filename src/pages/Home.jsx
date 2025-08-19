import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sets = [
  { id: 'lsu_top2receivers', title: 'LSU FB Top 3 Receivers (Yards)' },
  { id: 'lsu_passing', title: 'LSU FB Recent Passing (Min. 2 Completions)' },
  { id: 'lsu_firstrounders', title: 'LSU FB First Round Picks' },
  { id: 'lsu_baseballtop3draft', title: 'LSU BB Draft (Top 3 Rounds)' },
  { id: 'lsu_baseballrotationguys', title: 'LSU BB Rotation Guys (100-140 ABs)' },
  { id: 'lsu_baseballpitchers', title: 'LSU BB Pitchers (80+ IP)' },
  { id: 'nfl_touchdownleaderscareer', title: 'NFL Career Touchdown Leaders' },
  { id: 'nfl_touchdownleadersbyyear', title: 'NFL Touchdown Leaders By Year' },
  { id: 'nfl_touchdownleadersactivecareer', title: 'NFL Active Career Touchdown Leaders' },
  { id: 'nfl_superbowlmvps', title: 'NFL Superbowl MVPs' },
  { id: 'nfl_singleseasonrushyardleaders', title: 'NFL Single Season Rushing Leaders' },
  { id: 'nfl_singleseasonrecleaders', title: 'NFL Single Season Catch Leaders' },
  { id: 'nfl_singleseasonpassleaders', title: 'NFL Single Season Passing Leaders' },
  { id: 'nfl_mostinterceptionsseason', title: 'NFL Most Interceptions in a Season (>2005)' },
  { id: 'nfl_fantasyleaderyear', title: 'NFL Fantasy Leader' },
  { id: 'nfl_comebackplayer', title: 'NFL Comeback Player of the Year' },
  { id: 'nfl_1oadraftpicks', title: 'NFL 1OA Draft Picks' },
  { id: 'nfl_2025backupqbsnfc', title: 'NFL 2025 Backup QBs NFC' },
  { id: 'nfl_2025backupqbsafc', title: 'NFL 2025 Backup QBs AFC' },
  { id: 'nba_mips', title: 'NBA MIPs' },
  { id: 'nba_finalsmvps', title: 'NBA Finals MVPs' },
  { id: 'nba_1oadraftpicks', title: 'NBA 1OA Draft Picks' },
  { id: 'mlb_200hitseasons', title: 'MLB 200+ Hit Seasons' },
];

export default function Home() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setAuthenticated(input === '8880');
  };

  return (
    <div className="home">
      <h1>Dashboard</h1>

      {/* Password Input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="password"
          placeholder="Enter password to unlock"
          value={password}
          onChange={handlePasswordChange}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            maxWidth: '100%',
          }}
        />
        {!authenticated && password && (
          <div style={{ color: 'red', marginTop: '5px' }}>Incorrect password</div>
        )}
      </div>

      {/* Cards */}
      <div className="card-grid">
        {sets.map(set => (
          <div
            key={set.id}
            className={`card games ${!authenticated ? 'disabled' : ''}`}
            onClick={() => {
              if (authenticated) {
                navigate(`/board/${set.id}`, { state: { title: set.title } });
              }
            }}
            style={{
              pointerEvents: authenticated ? 'auto' : 'none',
              opacity: authenticated ? 1 : 0.5,
              cursor: authenticated ? 'pointer' : 'not-allowed',
            }}
          >
            <p>{set.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
