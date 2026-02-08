import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing all sets
import { set1 } from '../data/set1';
import { set2 } from '../data/set2';
import { set3 } from '../data/set3'; 
import { set4 } from '../data/set4'; 
import { set5 } from '../data/set5'; 

export default function Home() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setAuthenticated(input === '8880');
  };

  const allSets = {
    "Set 1": set1,
    "Set 2": set2,
    "Set 4": set4,
    "Set 5": set5,
    "Dudes Naming Dudes": set3 
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
            margin: '10px',
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

      {Object.keys(allSets).map((setName) => (
        <div key={setName} style={{ marginBottom: '30px' }}>
          <h2>{setName}</h2>
          <div className="card-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '15px' 
          }}>
            {allSets[setName].map((item) => (
              <div
                key={item.id}
                className={`games ${!authenticated ? 'disabled' : ''}`}
                onClick={() => {
                  if (authenticated) {
                    // CONDITIONAL ROUTING LOGIC
                    if (setName === "Dudes Naming Dudes") {
                      navigate(`/dnd-answers/${item.id}`, { state: { title: item.title } });
                    } else {
                      navigate(`/answers/${item.id}`, { state: { title: item.title } });
                    }
                  }
                }}
                style={{
                  pointerEvents: authenticated ? 'auto' : 'none',
                  opacity: authenticated ? 1 : 0.5,
                  cursor: authenticated ? 'pointer' : 'not-allowed',
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  textAlign: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                {authenticated ? item.title : item.number}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}