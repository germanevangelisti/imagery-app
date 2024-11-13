import React, { useState } from 'react';
import LocationSearchBar from '../components/LocationSearchBar';

function SearchView({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
        const data = await response.json();
        if (data.length > 0) {
            const { lat, lon } = data[0];
            onSearch(parseFloat(lat), parseFloat(lon));
        } else {
            alert('Location not found');
        }
    };

    return (
        <div>
            <h2>Search for a Location</h2>
            <LocationSearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        </div>
    );
}

export default SearchView;