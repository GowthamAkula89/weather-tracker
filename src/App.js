import './App.css';
import { DataProvider } from './Components/DataContext';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header/>
      </DataProvider>
    </div>
  );
}

export default App;
