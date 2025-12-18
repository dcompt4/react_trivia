import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Home, Image as ImageIcon, ImageOff, Play, Plus, Minus } from 'lucide-react';

export default function Navbar({ title, isAnswerBoard, setId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(null);
  const [globalToggle, setGlobalToggle] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // Score state for each team/color
  const colors = ['Salmon', 'PaleGreen', 'PaleTurquoise', '#D6CDEA', '#FEF8DD'];
  const [scores, setScores] = useState(
    colors.reduce((acc, color) => ({ ...acc, [color]: 0 }), {})
  );

  // Check if we are currently in the DND Slideshow
  const isDndGame = location.pathname.includes('/dnd-game/');

  const handleColorClick = (color) => {
    const newColor = selected === color ? null : color;
    setSelected(newColor);
    window.dispatchEvent(new CustomEvent('color-select', { detail: newColor }));

    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(30);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const updateScore = (color, delta, e) => {
    e.stopPropagation(); // Prevents triggering the timer/selection
    setScores(prev => ({
      ...prev,
      [color]: Math.max(0, prev[color] + delta) // Prevents negative scores
    }));
  };

  const handleToggleImages = () => {
    const newState = !globalToggle;
    setGlobalToggle(newState);
    window.dispatchEvent(new CustomEvent('toggle-images', { detail: newState }));
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="navbar" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '0 20px', 
      height: '100px', // Matches the 100px space we left in the slideshow
      backgroundColor: '#fff', 
      borderBottom: '1px solid #ddd',
      boxSizing: 'border-box'
    }}>
      <Home
        onClick={() => navigate('/')}
        size={32}
        style={{ cursor: 'pointer', marginRight: '15px' }}
        strokeWidth={2.5}
      />

{!isDndGame && (
  <button
    onClick={handleToggleImages}
    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    title="Toggle Images"
  >
    {globalToggle ? <ImageOff size={28} /> : <ImageIcon size={28} />}
  </button>
)}

      <h2 style={{ marginLeft: '15px', flexGrow: 1, fontSize: '20px' }}>{title}</h2>

      {isAnswerBoard ? (
        <button
          onClick={() => navigate(`/board/${setId}`, { state: { title: title.replace('ANSWER KEY: ', '') } })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          <Play size={20} fill="white" />
          START GAME
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {timeLeft > 0 && (
            <div style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '24px', color: '#ff4444' }}>
              {timeLeft}s
            </div>
          )}

          <div className="colors" style={{ display: 'flex', gap: '20px' }}>
            {colors.map((color) => (
              <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                
                {/* Score Controls (Only for DND Game) */}
                {isDndGame && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                    <Minus 
                      size={18} 
                      onClick={(e) => updateScore(color, -1, e)} 
                      style={{ cursor: 'pointer', color: '#888' }} 
                    />
                    <span style={{ fontWeight: 'bold', fontSize: '18px', minWidth: '20px', textAlign: 'center' }}>
                      {scores[color]}
                    </span>
                    <Plus 
                      size={18} 
                      onClick={(e) => updateScore(color, 1, e)} 
                      style={{ cursor: 'pointer', color: '#28a745' }} 
                    />
                  </div>
                )}

                <div
                  className="color-box"
                  style={{
                    backgroundColor: color,
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: selected === color ? '4px solid #333' : '4px solid ' + color,
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => handleColorClick(color)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}