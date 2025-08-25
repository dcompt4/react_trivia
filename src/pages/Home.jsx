import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sets = [
  { number: 1, id: 'lsu_top2receivers', title: 'LSU FB Top 3 Receivers (Yards)', category: 'LSU' },
  { number: 2, id: 'lsu_passing', title: 'LSU FB Recent Passing (Min. 2 Completions)', category: 'LSU' },
  { number: 3, id: 'lsu_firstrounders', title: 'LSU FB First Round Picks', category: 'LSU' },
  { number: 4, id: 'lsu_baseballtop3draft', title: 'LSU BB Draft (Top 3 Rounds)', category: 'LSU' },
  { number: 5, id: 'lsu_baseballrotationguys', title: 'LSU BB Rotation Guys (100-140 ABs)', category: 'LSU' },
  { number: 6, id: 'lsu_baseballpitchers', title: 'LSU BB Pitchers (80+ IP)', category: 'LSU' },

  { number: 7, id: 'nfl_avleadersactive', title: 'NFL Approximate Value Active', category: 'NFL' },
  { number: 8, id: 'nfl_avleaderscareer', title: 'NFL Approximate Value Career', category: 'NFL' },
  { number: 9, id: 'nfl_touchdownleaderscareer', title: 'NFL Career Touchdown Leaders', category: 'NFL' },
  { number: 10, id: 'nfl_touchdownleadersbyyear', title: 'NFL Touchdown Leaders By Year', category: 'NFL' },
  { number: 11, id: 'nfl_touchdownleadersactivecareer', title: 'NFL Active Career Touchdown Leaders', category: 'NFL' },
  { number: 12, id: 'nfl_superbowlmvps', title: 'NFL Superbowl MVPs', category: 'NFL' },
  { number: 13, id: 'nfl_singleseasonrushyardleaders', title: 'NFL Single Season Rushing Leaders', category: 'NFL' },
  { number: 14, id: 'nfl_singleseasonrecleaders', title: 'NFL Single Season Catch Leaders', category: 'NFL' },
  { number: 15, id: 'nfl_singleseasonpassleaders', title: 'NFL Single Season Passing Leaders', category: 'NFL' },
  { number: 16, id: 'nfl_mostinterceptionsseason', title: 'NFL Most Interceptions in a Season (>2005)', category: 'NFL' },
  { number: 17, id: 'nfl_fantasyleaderyear', title: 'NFL Fantasy Leader', category: 'NFL' },
  { number: 18, id: 'nfl_comebackplayer', title: 'NFL Comeback Player of the Year', category: 'NFL' },
  { number: 19, id: 'nfl_interceptionleaderbyyear', title: 'NFL Interception Leader by Year', category: 'NFL' },
  { number: 20, id: 'nfl_mostfirstteamapactive', title: 'NFL Most First Team All Pro Active', category: 'NFL' },
  { number: 21, id: 'nfl_1oadraftpicks', title: 'NFL 1OA Draft Picks', category: 'NFL' },
  { number: 22, id: 'nfl_2025backupqbsnfc', title: 'NFL 2025 Backup QBs NFC', category: 'NFL' },
  { number: 23, id: 'nfl_2025backupqbsafc', title: 'NFL 2025 Backup QBs AFC', category: 'NFL' },

  { number: 24, id: 'nba_mips', title: 'NBA MIPs', category: 'NBA' },
  { number: 25, id: 'nba_finalsmvps', title: 'NBA Finals MVPs', category: 'NBA' },
  { number: 26, id: 'nba_roty', title: 'NBA Rookie of the Years', category: 'NBA' },
  { number: 27, id: 'nba_1oadraftpicks', title: 'NBA 1OA Draft Picks', category: 'NBA' },
  { number: 28, id: 'nba_6mans', title: 'NBA 6th Man of the Year', category: 'NBA' },

  { number: 29, id: 'mlb_200hitseasons', title: 'MLB 200+ Hit Seasons', category: 'MLB' },

  { number: 30, id: 'ncaa_heismantop2s', title: 'NCAA Heisman Top 2s', category: 'NCAA' },
  
  { number: 31, id: 'nfl_6plustouchdowns', title: 'NFL 6+ Passing Touchdowns sincs 1990', category: 'NFL' },
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

  // Group sets by category
  const groupedSets = sets.reduce((acc, set) => {
    if (!acc[set.category]) acc[set.category] = [];
    acc[set.category].push(set);
    return acc;
  }, {});

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

      {/* Grouped Cards by Category */}
      {Object.keys(groupedSets).map((category) => (
        <div key={category} style={{ marginBottom: '30px' }}>
          <h2>{category}</h2>
          <div className="card-grid">
            {groupedSets[category].map((set, index) => (
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
                {/* Show number on button */}
                  {set.number}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
