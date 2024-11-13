import axios from 'axios';

const IMAGERY_API_BASE_URL = process.env.REACT_APP_IMAGERY_API_URL || 'http://localhost:4000';
const OSM_API_URL = 'https://nominatim.openstreetmap.org/search';
const instanceId = 'd6c75d03-2892-4b90-896d-64e4e520f3b0'

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

// export const getSentinelHubUrl = (lat, lon, zoom) => {
//     const instanceId = "8a49f50f-fc97-4ac1-8356-36c64bd4fecd"; // Tu Instance ID de Sentinel Hub

//     // Asegúrate de que lat y lon son números
//     lat = parseFloat(lat);
//     lon = parseFloat(lon);

//     // Usa paréntesis para cada cálculo y aplica toFixed después
//     const minLon = (lon - 0.01).toFixed(6);
//     const minLat = (lat - 0.01).toFixed(6);
//     const maxLon = (lon + 0.01).toFixed(6);
//     const maxLat = (lat + 0.01).toFixed(6);

//     // Concatenación correcta con comas entre valores
//     const BBOX = `${minLon},${minLat},${maxLon},${maxLat}`;

//     console.log("BBOX:", BBOX); // Verifica el formato de BBOX

//     return `https://services.sentinel-hub.com/ogc/wms/${instanceId}?SERVICE=WMS&REQUEST=GetMap&LAYERS=S2_L1C&MAXCC=20&WIDTH=512&HEIGHT=512&BBOX=${BBOX}&FORMAT=image/jpeg&CRS=EPSG:4326&TIME=2023-01-01/2023-12-31&TRANSPARENT=FALSE`;
// };

export const getSentinelHubUrl = (lat, lon, zoom = 13) => {
    const instanceId = "d6c75d03-2892-4b90-896d-64e4e520f3b0";
    const layerName = "1_TRUE_COLOR";
    const maxCloudCoverage = 20;
    const width = 512;
    const height = 512;
    const timeRange = "2020-01-01/2023-12-31";

    lat = parseFloat(lat);
    lon = parseFloat(lon);

    // Calcula el BBOX expandiendo una pequeña área alrededor de la coordenada
    const minLon = (lon - 0.01).toFixed(6);
    const minLat = (lat - 0.01).toFixed(6);
    const maxLon = (lon + 0.01).toFixed(6);
    const maxLat = (lat + 0.01).toFixed(6);
    const BBOX = `${minLon},${minLat},${maxLon},${maxLat}`;

    // Construye la URL
    return `https://services.sentinel-hub.com/ogc/wms/${instanceId}?SERVICE=WMS&REQUEST=GetMap&LAYERS=${layerName}&MAXCC=${maxCloudCoverage}&WIDTH=${width}&HEIGHT=${height}&BBOX=${BBOX}&FORMAT=image/jpeg&CRS=EPSG:4326&TIME=${timeRange}&STYLES=default`;
};

export const getGoogleMapsStaticUrl = (lat, lon, zoom = 15) => {
    const apiKey = "AIzaSyBGAre6OmBpBX1VD3gZ8vkjA56Cch8jxP0";
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=600x400&maptype=satellite&key=${apiKey}`;
};