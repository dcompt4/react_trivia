import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function AnswerBoard() {
  const { setId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = location.state?.title || 'Board';

  const [data, setData] = useState([]);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    fetch(`/data/${setId}.json`)
      .then(res => res.json())
      .then(setData);
  }, [setId]);

  return (
    <div style={{ paddingBottom: '50px' }}>
      {/* 1. THE NAVIGATION BUTTON (Sticky at the top) */}
      <div style={{
        width: '100%',
        backgroundColor: '#333',
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000 // Higher than Navbar
      }}>
        <button 
          onClick={() => navigate(`/board/${setId}`, { state: location.state })}
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745', // Green for "Go"
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          START GAME (Go to Playable Board)
        </button>
      </div>

      <Navbar 
        title={`ANSWER KEY: ${pageTitle}`} 
        isAnswerBoard={true} 
        setId={setId} 
      />

      {/* 2. THE WARNING OVERLAY */}
      {showWarning && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#000',
          zIndex: 9999, // Absolute highest
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <h1 style={{ color: 'red' }}>STOP!</h1>
          <p>Are you screen sharing? This is the ANSWER KEY.</p>
          <button 
            onClick={() => setShowWarning(false)}
            style={{ padding: '15px 30px', marginTop: '20px', cursor: 'pointer' }}
          >
            I am not sharing - Show Answers
          </button>
        </div>
      )}

      {/* 3. THE GRID */}
      <div className="board-grid">
        {data.map((item, idx) => (
          <Card
            key={idx}
            data={item}
            showImage={true} // Forces images on for the key
            forceReveal={true} // Tells Card.jsx to bypass flipping
          />
        ))}
      </div>
    </div>
  );
}