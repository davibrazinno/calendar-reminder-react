export interface Coordinates {
    lat: string,
    lng: string
}

export async function getCoordinatesByPlaceId(placeId: string): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
        const geocoderService = new google.maps.Geocoder()
        geocoderService.geocode({placeId: placeId}, (results: any, status: string) => {
            if (status === "OK") {
                if (results[0]) {
                    const coordinates = {
                        lat: String(results[0].geometry.location.lat()),
                        lng: String(results[0].geometry.location.lng())
                    }
                    resolve(coordinates)
                } else {
                    reject("No results found")
                }
            } else {
                reject("Geocoder failed due to: " + status)
            }
        });
    })
}
