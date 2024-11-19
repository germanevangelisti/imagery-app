import React, { useState } from 'react';
import './ImageryTimeline.css';

function ImageryTimeline({ dates, onDateChange }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSliderChange = (e) => {
        const index = parseInt(e.target.value, 10);
        setSelectedIndex(index);
        onDateChange(dates[index]);
    };

    return (
        <div className="imagery-timeline">
            <h3 className='text'>Explore Imagery History</h3>
            <div className="timeline-container">
                <input
                    type="range"
                    min="0"
                    max={dates.length - 1}
                    value={selectedIndex}
                    onChange={handleSliderChange}
                    className="timeline-slider"
                />
                <div className="timeline-dates">
                    {dates.map((date, index) => (
                        <span
                            key={index}
                            className={`timeline-date ${index === selectedIndex ? 'active' : ''}`}
                        >
                            {new Date(date).toLocaleDateString()}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageryTimeline;