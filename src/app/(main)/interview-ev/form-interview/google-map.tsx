import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useGeolocation } from "react-use";

interface Props {
  markerPosition: any,
  setMarkerPosition: any,
}
const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '20px',
};

const MyMapComponent = (props: Props) => {
  const [map, setMap] = useState<any>(null); // Store the GoogleMap instance
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  // const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const google_key_api = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: google_key_api as string,
  });

  const { latitude: geolocationLatitude, longitude: geolocationLongitude, error } = useGeolocation();

  useEffect(() => {
    if (geolocationLatitude !== null && geolocationLongitude !== null) {
      setLatitude(geolocationLatitude);
      setLongitude(geolocationLongitude);
      setMapCenter({ lat: geolocationLatitude, lng: geolocationLongitude });
      props.setMarkerPosition({ lat: geolocationLatitude, lng: geolocationLongitude });
    }
  }, [geolocationLatitude, geolocationLongitude]);

  const handleMarkerDrag = (event: any) => {
    props.setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleMapClick = (event: any) => {
    props.setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleMapLoad = (map: any) => {
    setMap(map);
  };

  return (
    <div>
      {isLoaded ? (
        <div>
          <div>
            <strong>Location ຂອງ ທ່ານ:</strong> {longitude !== null && latitude !== null ? props.markerPosition.lat.toFixed(6) + "," + props.markerPosition.lng.toFixed(6) : "N/A"}
          </div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
            onClick={handleMapClick}
            onLoad={handleMapLoad} // Set the onLoad callback
          >
            <Marker
              position={props.markerPosition}
              draggable={true}
              onDragEnd={handleMarkerDrag}
            />
          </GoogleMap>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MyMapComponent;
