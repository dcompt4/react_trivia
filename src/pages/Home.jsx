import { useNavigate } from 'react-router-dom';

const sets = [
  { id: 'lsu_passing', title: 'LSU Recent Passing (Min. 2 Completions)' },
  { id: 'lsu_top2receivers', title: 'LSU Top 2 Receivers (Yards)' },
  { id: 'lsu_firstrounders', title: 'LSU First Round Picks' },
  { id: 'nfl_1oadraftpicks', title: 'NFL 1OA Draft Picks' },
  { id: 'nfl_superbowlmvps', title: 'NFL Superbowl MVPs' },
  { id: 'nfl_touchdownleadersbyyear', title: 'NFL Touchdown Leaders By Year' },
  { id: 'nfl_touchdownleadersactivecareer', title: 'NFL Active Career Touchdown Leaders' },
  { id: 'nfl_fantasyleaderyear', title: 'NFL Fantasy Leader' },

  { id: 'nfl_touchdownleaderscareer', title: 'NFL Career Touchdown Leaders' },
  { id: 'nfl_mostinterceptionsseason', title: 'NFL Most Interceptions in a Season (>2005)' },

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
            className="card games"
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
