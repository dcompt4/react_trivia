import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';



export default function Board() {
  const { setId } = useParams();
  const [data, setData] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  // inside your Board component:
const location = useLocation();
const pageTitle = location.state?.title || 'Board';

  useEffect(() => {
    fetch(`/data/${setId}.json`)
      .then(res => res.json())
      .then(setData => setData)
      .then(set => setData(set));
  }, [setId]);

  useEffect(() => {
    const handleColorSelect = e => setSelectedColor(e.detail);
    window.addEventListener('color-select', handleColorSelect);
    return () => window.removeEventListener('color-select', handleColorSelect);
  }, []);

  return (
    <div>
      <Navbar title={pageTitle} />
      <div className="board-grid">
        {data.map((item, idx) => (
          <Card key={idx} data={item} selectedColor={selectedColor} />
        ))}
      </div>
    </div>
  );
}
