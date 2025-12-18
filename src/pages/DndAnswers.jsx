import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function DnDAnswerKey() {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    fetch(`/data/${setId}.json`).then(res => res.json()).then(setData);
  }, [setId]);

  return (
    <div style={{ padding: '20px' }}>
      {showWarning && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <h1 style={{ color: 'red' }}>STOP!</h1>
          <p>This is the DND NAME LIST.</p>
          <button onClick={() => setShowWarning(false)} style={{ padding: '15px 30px', marginTop: '20px' }}>Show Names</button>
        </div>
      )}

      <button onClick={() => navigate(`/dnd-game/${setId}`)} style={{ padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', marginBottom: '20px' }}>
        START SLIDESHOW GAME
      </button>

      <h2>Dudes List: {setId}</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map((item) => (
          <li key={item.id} style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>{item.id}.</strong> {item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}