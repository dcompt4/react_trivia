import { useNavigate } from 'react-router-dom';
const sets = [
  { id: 'lsu_passing', title: 'LSU Passing' },
  { id: 'set2', title: 'Set 2' }
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
            onClick={() => navigate(`/board/${set.id}`)}
          >
            {set.title}
          </div>
        ))}
      </div>
    </div>
  );
}
