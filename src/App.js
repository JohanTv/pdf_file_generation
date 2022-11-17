import logo from './logo.svg';
import './App.css';
import { PrimerComponente } from './components/PrimerComponente'
import { SegundoComponente } from './components/SegundoComponente'
import { SimpleTable } from './components/SimpleTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Esto es un repaso de React con Johan Tanta</p>
        <PrimerComponente />
        <SegundoComponente />
        <SimpleTable />
        {/* <button onClick={() => execute()}>Prueba</button> */}
      </header>
    </div>
  )
}

export default App;