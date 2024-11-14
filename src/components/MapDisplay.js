import React from 'react';

export const getGoogleMapsStaticUrl = (lat, lon, zoom = 15) => {
    const apiKey = "AIzaSyBGAre6OmBpBX1VD3gZ8vkjA56Cch8jxP0"; // Reemplaza con tu clave de API de Google Maps
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=600x400&maptype=satellite&key=${apiKey}`;
};

function MapDisplay({ lat, lon, date }) {
    const mapUrl = getGoogleMapsStaticUrl(lat, lon);

    return (
        <div>
            <h3 className='text'>Recent Imagery Capture</h3>
            <p>{date ? `Date: ${new Date(date).toLocaleDateString()}` : "No date selected"}</p>
            <img src={mapUrl} alt="Satellite view of location" />
        </div>
    );
}

export default MapDisplay;