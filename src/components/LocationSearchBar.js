import React from 'react';
import './LocationSearchBar.css';

function LocationSearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location"
        className="search-input"
      />
      <button onClick={onSearch} className="button">Search</button>
    </div>
  );
}

export default LocationSearchBar;