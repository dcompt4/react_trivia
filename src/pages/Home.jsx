import { useNavigate } from 'react-router-dom';

const sets = [
  { id: 'lsu_passing', title: 'LSU Quarterbacks' },
  { id: 'set2', title: 'Backup Legends' }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Dashboard</h1>
      <div className="card-grid">
        {sets.map(set => (
          <div
            key={set.id}
            className="card"
            onClick={() =>
              navigate(`/board/${set.id}`, { state: { title: set.title } })
            }
          >
            {set.title}
          </div>
        ))}
      </div>
    </div>
  );
}
