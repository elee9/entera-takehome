import { GOOGLE_MAPS_API_KEY } from "../../common";
import { useState, useContext, useMemo } from 'react';
import CollegeDataContext from '../../context/CollegeDataContext';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import './Map.css';

function Map() {
    const { collegeData } = useContext(CollegeDataContext);
    const [ markerInfo, setMarkerInfo ] = useState({});
    const [ markerInfoOpen, setMarkerInfoOpen] = useState(false);
    const mapCenter = useMemo(() => ({lat: 39.8283, lng: -98.5795}), []);


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const markers = collegeData.map(({ name, lat, lng }, index) => {
        return (
            <Marker
                key = {index}
                position = {{ lat, lng }}
                draggable = {false}
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
        <div className='map-wrapper'>
            <GoogleMap
                zoom = {4.9}
                center = {mapCenter}
                mapContainerClassName='map-container'
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
                        ),
                        disableAutoPan: true
                    }}
                >
                    <div>{markerInfo.name}</div>
                </InfoWindow>)}
            </GoogleMap>
        </div>
    );
}

export default Map;