import Geocode from 'react-geocode';

export interface Coordinates {
    lat: string,
    lng: string
}

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY as string);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// Get latitude & longitude from address.
export async function getCoordinates(address: string): Promise<Coordinates> {
    try {
        const response = await Geocode.fromAddress(address)
        return response.results[0].geometry.location
    } catch (e) {
        throw e
    }
}

