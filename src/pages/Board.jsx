import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function Board() {
  const { setId } = useParams();
  const location = useLocation();
  const pageTitle = location.state?.title || 'Board';

  const [data, setData] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showImages, setShowImages] = useState(false);

  // Load data
  useEffect(() => {
    fetch(`/data/${setId}.json`)
      .then(res => res.json())
      .then(setData);
  }, [setId]);
  

  // Listen for color select and toggle image events
  useEffect(() => {
    const handleColorSelect = e => setSelectedColor(e.detail);
    const handleToggleImages = e => setShowImages(e.detail);

    window.addEventListener('color-select', handleColorSelect);
    window.addEventListener('toggle-images', handleToggleImages);

    return () => {
      window.removeEventListener('color-select', handleColorSelect);
      window.removeEventListener('toggle-images', handleToggleImages);
    };
  }, []);

  return (
    <div>
      <Navbar title={pageTitle} />
      <div className="board-grid">
        {data.map((item, idx) => (
          <Card
            key={idx}
            data={item}
            selectedColor={selectedColor}
            showImage={showImages}
          />
        ))}
      </div>
    </div>
  );
}
