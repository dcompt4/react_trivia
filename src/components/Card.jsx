import { useEffect, useState } from 'react';

export default function Card({ data, selectedColor }) {
  const [revealed, setRevealed] = useState(false);
  const [color, setColor] = useState(null);
  const [showImage, setShowImage] = useState(false); // local image state
  const [globalToggle, setGlobalToggle] = useState(false); // listens to navbar toggle

  const handleClick = () => {
    if (!revealed && selectedColor) {
      setRevealed(true);
      setColor(selectedColor);

      // Always show the image if revealed
      if (data.image) {
        setShowImage(true);
      }
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
      style={{ backgroundColor: color || 'white' }}
    >
      <div className="hint"><p>{data.hint}</p></div>

      <div
        className="answer"
        style={{
          visibility: revealed ? 'visible' : 'hidden',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.3s ease',
          minHeight: '1.2em',
        }}
      >
        <p>{data.answer}</p>
      </div>

      {data.image && (
        <div class='answer-image'
          style={{
            opacity: revealed || globalToggle ? 1 : 0,
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
