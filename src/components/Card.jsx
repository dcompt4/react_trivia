import { useState } from 'react';

export default function Card({ data, selectedColor }) {
  const [revealed, setRevealed] = useState(false);
  const [color, setColor] = useState(null);

  const handleClick = () => {
    if (!revealed && selectedColor) {
      setRevealed(true);
      setColor(selectedColor);
    } else if (revealed && selectedColor) {
      setColor(selectedColor);
    }
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{ backgroundColor: color || 'white' }}
    >
      <div className="hint">{data.hint}</div>

      <div
        className="answer"
        style={{
          visibility: revealed ? 'visible' : 'hidden',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.3s ease',
          minHeight: '1.2em', // reserve vertical space
        }}
      >
        {data.answer}
      </div>

      <div
        style={{
          visibility: revealed && data.image ? 'visible' : 'hidden',
          opacity: revealed && data.image ? 1 : 0,
          transition: 'opacity 0.3s ease',
          minHeight: '0px' // adjust based on expected image height
        }}
      >
        {data.image && <img src={`/images/${data.image}`} alt="" style={{ maxHeight: '60px' }} />}
      </div>
    </div>
  );
}
