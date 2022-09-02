import { GOOGLE_MAPS_API_KEY } from "../common";
import { useState, useContext } from 'react';
import CollegeDataContext from '../context/CollegeDataContext';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

function Map() {
    const { collegeData } = useContext(CollegeDataContext);
    const [ markerInfo, setMarkerInfo ] = useState({});
    const [ markerInfoOpen, setMarkerInfoOpen] = useState(false);


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const mapContainer = {
        width: '80%',
        height: '80vh'
    };

    const markers = collegeData.map(({ name, lat, lng }, index) => {
        return (
            <Marker
                key = {index}
                position = {{ lat, lng }}
                onMouseOver = {() => handleMouseOverMarker(name, lat, lng)}
                onMouseOut = {() => setMarkerInfoOpen(false)}
            >
            </Marker>
        );
    });

    const handleMouseOverMarker = (name, lat, lng) => {
        setMarkerInfo({name, lat, lng});
        setMarkerInfoOpen(true);
    }

    if (!isLoaded) return <div>Loading...</div>
    return (
        <GoogleMap
            zoom = {5}
            center = {{
                //center of the US
                lat: 39.8283,
                lng: -98.5795
            }}
            mapContainerStyle={mapContainer}
        >
            {markers}
            {markerInfoOpen && 
            (<InfoWindow
                position = {{
                    lat: markerInfo.lat,
                    lng: markerInfo.lng
                }}
                options={{
                    pixelOffset: new window.google.maps.Size(
                      0, -30
                    )
                }}
            >
                <div>{markerInfo.name}</div>
            </InfoWindow>)}
        </GoogleMap>
    );
}

export default Map;