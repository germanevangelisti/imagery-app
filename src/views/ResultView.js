import React, { useState, useEffect } from 'react';
import MapDisplay from '../components/MapDisplay';
import ImageryTimeline from '../components/ImageryTimeline';
import FutureOpportunities from '../components/FutureOpportunities';
import ImageryMetadata from '../components/ImageryMetadata';
import { searchCaptures } from '../services/apiService';

function ResultView({ lat, lon, onReset }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [pastDates, setPastDates] = useState([]);

    useEffect(() => {
        const fetchPastCaptures = async () => {
            try {
                const captures = await searchCaptures(lat, lon);
                setPastDates(captures);

                if (captures.length > 0) {
                    setSelectedDate(captures[0].captureDate);
                    setImageData(captures[0]);
                }
            } catch (error) {
                console.error("Error fetching past captures:", error);
            }
        };

        fetchPastCaptures();
    }, [lat, lon]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const selectedCapture = pastDates.find(capture => capture.captureDate === date);
        setImageData(selectedCapture ? selectedCapture : null);
    };

    return (
        <div>
            <div className="map-and-metadata" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <MapDisplay lat={lat} lon={lon} date={selectedDate} />
                {imageData && <ImageryMetadata imageData={imageData} />}
            </div>
            <ImageryTimeline
                lat={lat}
                lon={lon}
                onDateChange={handleDateChange}
                dates={pastDates.map(capture => capture.captureDate)}
            />
            <FutureOpportunities lat={lat} lon={lon} />
            <button onClick={onReset} className="button" >New Search</button>
        </div>
    );
}

export default ResultView;