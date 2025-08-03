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
      {revealed && (
        <>
          <div className="answer">{data.answer}</div>
          {data.image && <img src={`/images/${data.image}`} alt="" />}
        </>
      )}
    </div>
  );
}
