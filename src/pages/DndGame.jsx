import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DnDSlideshow() {
  const { setId } = useParams();
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`/data/${setId}.json`).then(res => res.json()).then(setData);
  }, [setId]);

  const nextSlide = useCallback(() => setCurrentIndex((prev) => (prev + 1) % data.length), [data.length]);
  const prevSlide = useCallback(() => setCurrentIndex((prev) => (prev - 1 + data.length) % data.length), [data.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (data.length === 0) return <div>Loading...</div>;

  const currentDude = data[currentIndex];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#000' }}>
      
      {/* Fixed 100px Navbar */}
      <div style={{ height: '100px', flexShrink: 0 }}>
        <Navbar title={`Dudes Naming Dudes`} />
      </div>

      <div style={{ 
        flex: 1, 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        
        {/* ID Overlay */}
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '10px 25px', 
          borderRadius: '8px', 
          zIndex: 10, 
          fontSize: '48px',
          fontWeight: 'bold',
          border: '2px solid rgba(255,255,255,0.2)'
        }}>
          {currentDude.id}
        </div>

        {/* Enhanced Image Logic */}
        <img 
          src={currentDude.image} 
          alt="Dude" 
          style={{ 
            width: 'auto',
            height: 'auto',
            maxWidth: '100%', 
            maxHeight: '100%', 
            minWidth: '80%',     // Forces small images to be at least 80% wide
            objectFit: 'contain' // Prevents stretching/distortion
          }} 
        />

        {/* Navigation Buttons */}
        <button onClick={prevSlide} style={navButtonStyle({ left: '20px' })}>❮</button>
        <button onClick={nextSlide} style={navButtonStyle({ right: '20px' })}>❯</button>
      </div>

      {/* Footer */}
      <div style={{ 
        height: '40px', 
        textAlign: 'center', 
        lineHeight: '40px', 
        backgroundColor: '#222', 
        color: '#888',
        fontSize: '14px',
        flexShrink: 0
      }}>
        PLAYER {currentIndex + 1} OF {data.length}
      </div>
    </div>
  );
}

const navButtonStyle = (pos) => ({
  position: 'absolute',
  top: '50%',
  ...pos,
  transform: 'translateY(-50%)',
  padding: '25px',
  fontSize: '40px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '50%',
  zIndex: 5
});