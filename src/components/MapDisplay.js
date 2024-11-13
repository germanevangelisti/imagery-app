import React from 'react';

export const getGoogleMapsStaticUrl = (lat, lon, zoom = 15) => {
    const apiKey = "AIzaSyBGAre6OmBpBX1VD3gZ8vkjA56Cch8jxP0"; // Reemplaza con tu clave de API de Google Maps
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=600x400&maptype=satellite&key=${apiKey}`;
};

function MapDisplay({ lat, lon, date }) {
    const mapUrl = getGoogleMapsStaticUrl(lat, lon);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <div>
            <h3 className='text'>Recent Imagery Capture</h3>
            <p>{date ? `Date: ${formatDate(date)}` : "No date selected"}</p>
            <img src={mapUrl} alt="Satellite view of location" />
        </div>
    );
}

export default MapDisplay;