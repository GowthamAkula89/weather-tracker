import './App.css';
import Dashboard from './Components/Dashboard';
import { DataProvider } from './Components/DataContext';
import Header from './Components/Header';
import TemperatureConverter from './Components/ToggleSwitch';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <TemperatureConverter/>
        <Dashboard/>
      </DataProvider>
    </div>
  );
}

export default App;