import Board from './components/board';
import './components/style.css';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home'
import About from './components/about'
import Contact from './components/contact'
import Events from './components/events'

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages" id='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/board" element={<Board />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
  </>
  );
}

export default App;
