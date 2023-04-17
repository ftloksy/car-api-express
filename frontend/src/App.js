import logo from './logo.svg';
import './App.css';
import CarsInfo from './components/CarsInfo';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CarsInfo />
      </header>
      <Footer />
    </div>
  );
}

export default App;
