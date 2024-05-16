import './App.css';
import Dashboard from './Components/Dashboard';
import { DataProvider } from './Components/DataContext';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Dashboard/>
      </DataProvider>
    </div>
  );
}

export default App;