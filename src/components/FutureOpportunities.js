import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './FutureOpportunities.css'; // Import the CSS file

function FutureOpportunities({ lat, lon, onOpportunitiesFetched }) {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/opportunities?lat=${lat}&lon=${lon}`);
                setOpportunities(response.data);
                onOpportunitiesFetched(response.data.map(op => op.estimatedCaptureDate));
            } catch (error) {
                console.error("Error fetching future opportunities:", error);
            }
        };

        fetchOpportunities();
    }, [lat, lon, onOpportunitiesFetched]);

    return (
        <div>
            <h3 className='text'>Future Capture Opportunities</h3>
            <div className="future-opportunities-container">
                {opportunities.map((op) => (
                    <div key={op.opportunityId} className="future-opportunity-card">
                        <p>Opportunity ID: {op.opportunityId}</p>
                        <p>Estimated Capture Date: {new Date(op.estimatedCaptureDate).toLocaleDateString()}</p>
                        <p>Confidence: {op.confidence}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FutureOpportunities;