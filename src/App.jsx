import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import AnswerBoard from './pages/AnswerBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:setId" element={<Board />} />
        <Route path="/answers/:setId" element={<AnswerBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
