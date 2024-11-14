import React, { useState } from 'react';
import LocationSearchBar from '../components/LocationSearchBar';
import { searchLocation } from '../services/apiService';

function SearchView({ onSearch }) {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError('');
        try {
            const { lat, lon } = await searchLocation(query);
            onSearch(parseFloat(lat), parseFloat(lon));
        } catch (err) {
            setError(err.message || 'An error occurred while searching');
        }
    };

    return (
        <div>
            <h2>Search for a Location</h2>
            <LocationSearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default SearchView;