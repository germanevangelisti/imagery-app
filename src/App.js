import React, { useState } from 'react';
import SearchView from './views/SearchView';
import ResultView from './views/ResultView';

function App() {
  const [location, setLocation] = useState(null);

  const handleLocationSearch = (lat, lon) => {
    setLocation({ lat, lon });
  };

  const handleReset = () => {
    setLocation(null);
  };

  return (
    <div className="App">
      {!location ? (
        <SearchView onSearch={handleLocationSearch} />
      ) : (
        <ResultView lat={location.lat} lon={location.lon} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
