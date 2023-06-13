import Board from './components/board';
import './components/style.css';
import Home from './components/home'

function App() {
  return (
    <div className="App">
      <Home></Home>
      <div id="main">
      <Board></Board>
      </div>
    </div>
  );
}

export default App;
