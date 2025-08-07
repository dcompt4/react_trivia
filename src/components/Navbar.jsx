import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Home, Image as ImageIcon, ImageOff } from 'lucide-react';

export default function Navbar({ title }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showImages, setShowImages] = useState(false); // NEW

  const handleColorClick = (color) => {
    const newColor = selected === color ? null : color;
    setSelected(newColor);
    window.dispatchEvent(new CustomEvent('color-select', { detail: newColor }));
  };

  const handleToggleImages = () => {
    const newState = !showImages;
    setShowImages(newState);
    window.dispatchEvent(new CustomEvent('toggle-images', { detail: newState }));
  };

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
