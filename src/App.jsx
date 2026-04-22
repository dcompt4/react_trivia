import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import AnswerBoard from './pages/AnswerBoard';
import DnDAnswerKey from './pages/DndAnswers';
import DnDSlideshow from './pages/DndGame';
import WordScrambleAnswerKey from './pages/WordScrambleAnswers';
import WordScrambleSlideshow from './pages/WordScrambleGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:setId" element={<Board />} />
        <Route path="/answers/:setId" element={<AnswerBoard />} />
        <Route path="/dnd-answers/:setId" element={<DnDAnswerKey />} />
        <Route path="/dnd-game/:setId" element={<DnDSlideshow />} />
        <Route path="/word-scramble-answers/:setId" element={<WordScrambleAnswerKey />} />
        <Route path="/word-scramble-game/:setId" element={<WordScrambleSlideshow />} />
      </Routes>
    </Router>
  );
}

export default App;
