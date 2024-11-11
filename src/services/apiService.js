import axios from 'axios';

const IMAGERY_API_BASE_URL = 'http://localhost:4000';
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
    return response.data;
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