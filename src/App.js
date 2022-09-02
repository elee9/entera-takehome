import './App.css';
import CollegeDataContext from './context/CollegeDataContext';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Map from './components/Map';

function App() {
  const [collegeData, setCollegeData] = useState([]);
  return (
    <div className="App">
      <CollegeDataContext.Provider value={{ collegeData, setCollegeData }}>
        <SearchBar/>
        <Map/>
      </CollegeDataContext.Provider>
    </div>
  );
}

export default App;
