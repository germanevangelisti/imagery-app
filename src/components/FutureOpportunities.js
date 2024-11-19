import React, { useEffect, useState } from 'react';
import { getFutureOpportunities } from '../services/apiService';
import './FutureOpportunities.css';

function FutureOpportunities({ lat, lon }) {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const data = await getFutureOpportunities(lat, lon);
                setOpportunities(data);
            } catch (error) {
                console.error("Error fetching future opportunities:", error);
            }
        };

        fetchOpportunities();
    }, [lat, lon]);

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