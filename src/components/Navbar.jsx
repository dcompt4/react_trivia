import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Home, Image as ImageIcon, ImageOff } from 'lucide-react';

export default function Navbar({ title }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null); // store interval ID

  const handleColorClick = (color) => {
    const newColor = selected === color ? null : color;
    setSelected(newColor);
    window.dispatchEvent(new CustomEvent('color-select', { detail: newColor }));

    // Reset and start 30s countdown
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
    const newState = !showImages;
    setShowImages(newState);
    window.dispatchEvent(new CustomEvent('toggle-images', { detail: newState }));
  };

  // cleanup if component unmounts
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="navbar" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <Home
        onClick={() => navigate('/')}
        size={32}
        style={{ cursor: 'pointer' }}
        strokeWidth={2.5}
      />

      <button
        onClick={handleToggleImages}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        title="Toggle Images"
      >
        {showImages ? <ImageOff size={28} /> : <ImageIcon size={28} />}
      </button>

      <h2 style={{ marginLeft: '10px', flexGrow: 1 }}>{title}</h2>

      {/* Timer display */}
      {timeLeft > 0 && (
        <div style={{ marginRight: '15px', fontWeight: 'bold', fontSize: '18px' }}>
          {timeLeft}
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
              border: selected === color ? '3px solid black' : '3px solid transparent',
              transition: 'border 0.2s',
            }}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
    </div>
  );
}
