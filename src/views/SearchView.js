import React, { useState } from 'react';
import { searchLocation } from '../services/apiService';

function SearchView() {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const result = await searchLocation(query);
            setLocation(result);
            setError(null);
        } catch (error) {
            setLocation(null);
            console.error("Error fetching location:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search View</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter location"
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>
                {error}
            </div>}
            {location && (
                <div>
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.lon}</p>
                </div>
            )}
        </div>
    );
}

export default SearchView;