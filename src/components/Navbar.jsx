import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Home, Image as ImageIcon, ImageOff, Play } from 'lucide-react'; // Added Play icon

export default function Navbar({ title, isAnswerBoard, setId }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [globalToggle, setGlobalToggle] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

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

  const handleToggleImages = () => {
    const newState = !globalToggle;
    setGlobalToggle(newState);
    window.dispatchEvent(new CustomEvent('toggle-images', { detail: newState }));
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="navbar" style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <Home
        onClick={() => navigate('/')}
        size={32}
        style={{ cursor: 'pointer', marginRight: '15px' }}
        strokeWidth={2.5}
      />

      <button
        onClick={handleToggleImages}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        title="Toggle Images"
      >
        {globalToggle ? <ImageOff size={28} /> : <ImageIcon size={28} />}
      </button>

      <h2 style={{ marginLeft: '15px', flexGrow: 1, fontSize: '20px' }}>{title}</h2>

      {/* CONDITIONAL RENDERING: Button for Answer Board OR Colors for Game Board */}
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
        <>
          {timeLeft > 0 && (
            <div style={{ marginRight: '15px', fontWeight: 'bold', fontSize: '18px', color: '#000000' }}>
              {timeLeft}s
            </div>
          )}

          <div className="colors" style={{ display: 'flex', gap: '10px' }}>
            {['Salmon', 'PaleGreen', 'PaleTurquoise', '#D6CDEA', '#FEF8DD'].map((color) => (
              <div
                key={color}
                className="color-box"
                style={{
                  backgroundColor: color,
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: selected === color ? '3px solid black' : '3px solid ' + color,
                  transition: 'border 0.2s',
                }}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}