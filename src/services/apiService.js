import axios from 'axios';

const IMAGERY_API_BASE_URL = process.env.REACT_APP_IMAGERY_API_URL || 'http://localhost:4000';
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const SENTINEL_API_KEY = process.env.REACT_APP_SENTINEL_API_KEY
const OSM_API_URL = 'https://nominatim.openstreetmap.org/search';

export const searchLocation = async (query) => {
    if (!query.trim()) {
        throw new Error("You must enter a location.");
    }
    try {
        const response = await axios.get(OSM_API_URL, {
            params: {
                q: query,
                format: 'json',
                addressdetails: 1,
                limit: 1,
            },
        });
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat, lon };
        } else {
            throw new Error("Location not found.");
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        throw error;
    }
};

export const searchCaptures = async (lat, lon) => {
    try {
        const response = await axios.get(`${IMAGERY_API_BASE_URL}/search`, {
            params: { lat, lon }
        });

        const sortedCaptures = response.data.sort((a, b) => new Date(b.captureDate) - new Date(a.captureDate));

        return sortedCaptures;
    } catch (error) {
        console.error("Error fetching captures:", error);
        throw error;
    }
};

// Not used right now
export const getRecentCaptures = async (lat, lon) => {
    try {
        const response = await axios.get(`${IMAGERY_API_BASE_URL}/archive`, {
            params: { lat, lon }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching recent captures:", error);
        throw error;
    }
};

export const getFutureOpportunities = async (lat, lon) => {
    try {
        const response = await axios.get(`${IMAGERY_API_BASE_URL}/opportunities`, {
            params: { lat, lon }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching future opportunities:", error);
        throw error;
    }
};

export const getSentinelHubUrl = (lat, lon, zoom = 13) => {
    const params = {
        SERVICE: "WMS",
        REQUEST: "GetMap",
        LAYERS: "1_TRUE_COLOR",
        MAXCC: 20,
        WIDTH: 512,
        HEIGHT: 512,
        FORMAT: "image/jpeg",
        CRS: "EPSG:4326",
        TIME: "2020-01-01/2023-12-31",
        STYLES: "default",
    };

    const bbox = calculateBoundingBox(lat, lon, 0.01);

    const queryString = new URLSearchParams({
        ...params,
        BBOX: bbox,
    }).toString();

    return `https://services.sentinel-hub.com/ogc/wms/${SENTINEL_API_KEY}?${queryString}`;
};

const calculateBoundingBox = (lat, lon, offset) => {
    const minLon = (lon - offset).toFixed(6);
    const minLat = (lat - offset).toFixed(6);
    const maxLon = (lon + offset).toFixed(6);
    const maxLat = (lat + offset).toFixed(6);
    return `${minLon},${minLat},${maxLon},${maxLat}`;
};

export const getGoogleMapsStaticUrl = (lat, lon, zoom = 15) => {
    const params = {
        center: `${lat},${lon}`,
        zoom: zoom,
        size: "600x400",
        maptype: "satellite",
        key: GOOGLE_MAPS_API_KEY,
    };

    const queryString = new URLSearchParams(params).toString();

    return `https://maps.googleapis.com/maps/api/staticmap?${queryString}`;
};