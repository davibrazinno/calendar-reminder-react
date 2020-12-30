export interface Coordinates {
    lat: string,
    lng: string
}

let geocoder: any

export async function getCoordinatesByPlaceId(placeId: string): Promise<Coordinates> {
    if(!geocoder) {
        geocoder = new google.maps.Geocoder()
    }
    return new Promise((resolve, reject) => {
        geocoder.geocode({placeId: placeId}, (results: any, status: string) => {
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
