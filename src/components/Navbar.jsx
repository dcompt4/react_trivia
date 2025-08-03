import { useNavigate } from 'react-router-dom';

export default function Navbar({ title }) {
    const navigate = useNavigate();
    return (
      <div className="navbar">
        <img
          src="/logo.png"
          alt="Logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', height: '40px' }}
        />
        <h2 style={{ marginLeft: '10px' }}>{title}</h2>
        <div className="colors">
          {['red', 'green', 'blue'].map(color => (
            <div
              key={color}
              className="color-box"
              style={{ backgroundColor: color }}
              onClick={() => window.dispatchEvent(new CustomEvent('color-select', { detail: color }))}
            ></div>
          ))}
        </div>
      </div>
    );
  }
  
