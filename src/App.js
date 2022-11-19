import logo from './logo.svg';
import './App.css';
import { PDFTable } from './components/PDFTable';
import { ExcelTable } from './components/ExcelTable';
import { GalleryReport } from './components/GalleryReport';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Esto es un repaso de React con Johan Tanta</p>
        <PDFTable/>
        <ExcelTable/>
        <GalleryReport/>
      </header>
    </div>
  )
}

export default App;