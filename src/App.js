import logo from './logo.svg';
import './App.css';
import { ExportTableInPDF } from './components/ExportTableInPDF';
import { ExportTableInXlsx } from './components/ExportTableInXlsx';
import { ExportGalleryReport } from './components/ExportGalleryReport';
import { ExportArtworkTags } from './components/ExportArtworkTags';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Esto es un repaso de React con Johan Tanta</p>
        <ExportTableInPDF/>
        <ExportTableInXlsx/>
        <ExportGalleryReport/>
        <ExportArtworkTags/>
      </header>
    </div>
  )
}

export default App;