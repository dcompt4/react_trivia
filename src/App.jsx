import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import AnswerBoard from './pages/AnswerBoard';
import DnDAnswerKey from './pages/DndAnswers';
import DnDSlideshow from './pages/DndGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:setId" element={<Board />} />
        <Route path="/answers/:setId" element={<AnswerBoard />} />
        <Route path="/dnd-answers/:setId" element={<DnDAnswerKey />} />
        <Route path="/dnd-game/:setId" element={<DnDSlideshow />} />
      </Routes>
    </Router>
  );
}

export default App;
