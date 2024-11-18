import React from 'react';
import { getGoogleMapsStaticUrl } from '../services/apiService';

function MapDisplay({ lat, lon, date }) {
    const mapUrl = getGoogleMapsStaticUrl(lat, lon);

    return (
        <div>
            <h3 className='text'>Recentss Imagery Capture</h3>
            <p>{date ? `Date: ${new Date(date).toLocaleDateString()}` : "No date selected"}</p>
            <img src={mapUrl} alt="Satellite view of location" />
        </div>
    );
}

export default MapDisplay;