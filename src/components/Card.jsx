import { useEffect, useState } from 'react';

// Added forceReveal to the destructured props
export default function Card({ data, selectedColor, forceReveal }) {
  const [revealed, setRevealed] = useState(false);
  const [color, setColor] = useState(null);
  const [globalToggle, setGlobalToggle] = useState(false);

  // LOGIC CHANGE: We are "effectively revealed" if the card was clicked OR forceReveal is true
  const isActuallyShowing = forceReveal || revealed;

  const handleClick = () => {
    // Disable clicking if we are on the Answer Board (forceReveal)
    if (forceReveal) return;

    if (!revealed && selectedColor) {
      setRevealed(true);
      setColor(selectedColor);
    } else if (revealed && selectedColor) {
      setColor(selectedColor);
    }
  };

  useEffect(() => {
    const toggleHandler = (e) => setGlobalToggle(e.detail);
    window.addEventListener('toggle-images', toggleHandler);
    return () => window.removeEventListener('toggle-images', toggleHandler);
  }, []);

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{ 
        // Show white on Answer Board, or the selected color/white on Normal Board
        backgroundColor: forceReveal ? 'white' : (color || 'white'),
        cursor: forceReveal ? 'default' : 'pointer'
      }}
    >
      <div className="hint"><p>{data.hint}</p></div>

      <div
        className="answer"
        style={{
          // Use our new variable to determine visibility
          visibility: isActuallyShowing ? 'visible' : 'hidden',
          opacity: isActuallyShowing ? 1 : 0,
          transition: 'opacity 0.3s ease',
          minHeight: '1.2em',
        }}
      >
        <p>{data.answer}</p>
      </div>

      {data.image && (
        <div className='answer-image'
          style={{
            // Images show if forced, revealed, or globally toggled
            opacity: isActuallyShowing || globalToggle ? 1 : 0,
            transition: 'opacity 0.3s ease',
            minHeight: '60px',
          }}
        >
          <img
            src={`/images/${data.image}`}
            alt=""
            style={{ maxHeight: '60px', maxWidth: '120px' }}
          />
        </div>
      )}
    </div>
  );
}