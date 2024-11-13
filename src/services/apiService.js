import axios from 'axios';

const IMAGERY_API_BASE_URL = process.env.REACT_APP_IMAGERY_API_URL || 'http://localhost:4000';
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const SENTINEL_API_KEY = process.env.REACT_APP_SENTINEL_API_KEY
const OSM_API_URL = 'https://nominatim.openstreetmap.org/search';

// Función para buscar una ubicación en OpenStreetMap
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

// Función para buscar capturas en una ubicación
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

// Función para obtener las capturas recientes
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

// Función para obtener oportunidades futuras de captura
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
    const layerName = "1_TRUE_COLOR";
    const maxCloudCoverage = 20;
    const width = 512;
    const height = 512;
    const timeRange = "2020-01-01/2023-12-31";

    lat = parseFloat(lat);
    lon = parseFloat(lon);

    const minLon = (lon - 0.01).toFixed(6);
    const minLat = (lat - 0.01).toFixed(6);
    const maxLon = (lon + 0.01).toFixed(6);
    const maxLat = (lat + 0.01).toFixed(6);
    const BBOX = `${minLon},${minLat},${maxLon},${maxLat}`;

    return `https://services.sentinel-hub.com/ogc/wms/${SENTINEL_API_KEY}?SERVICE=WMS&REQUEST=GetMap&LAYERS=${layerName}&MAXCC=${maxCloudCoverage}&WIDTH=${width}&HEIGHT=${height}&BBOX=${BBOX}&FORMAT=image/jpeg&CRS=EPSG:4326&TIME=${timeRange}&STYLES=default`;
};

export const getGoogleMapsStaticUrl = (lat, lon, zoom = 15) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=600x400&maptype=satellite&key=${GOOGLE_MAPS_API_KEY}`;
};