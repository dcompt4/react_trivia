import { useEffect, useState } from 'react';

export default function Card({ data, selectedColor }) {
  const [revealed, setRevealed] = useState(false);
  const [color, setColor] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const handleClick = () => {
  if (!revealed && selectedColor) {
    setRevealed(true);
    setColor(selectedColor);

    // If the image is not already showing, show it when revealing the card
    if (data.image && !showImage) {
      setShowImage(true);
    }
  } else if (revealed && selectedColor) {
    setColor(selectedColor);
  }
};


  useEffect(() => {
    const toggleHandler = (e) => setShowImage(e.detail);
    window.addEventListener('toggle-images', toggleHandler);
    return () => window.removeEventListener('toggle-images', toggleHandler);
  }, []);

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
          minHeight: '1.2em',
        }}
      >
        {data.answer}
      </div>

      {data.image && (
        <div
          style={{
            opacity: showImage ? 1 : 0,
            transition: 'opacity 0.3s ease',
            minHeight: '60px'
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
