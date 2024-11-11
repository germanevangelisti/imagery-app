import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchView from './views/SearchView';
import ResultView from './views/ResultView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/results" element={<ResultView />} />
      </Routes>
    </Router>
  );
}

export default App;
