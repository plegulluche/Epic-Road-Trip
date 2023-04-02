import { useMapEvent } from 'react-leaflet';

const MapClickHandler = ({ origin, destination, waypoints, updateOrigin, updateDestination, updateWaypoints }) => {
  useMapEvent('click', (e) => {
    if (!origin) {
      updateOrigin(e.latlng);
      alert('Click on the map to set the destination');
    } else if (!destination) {
      updateDestination(e.latlng);
      alert('Click on the map to add waypoints');
    } else {
      updateWaypoints([...waypoints, e.latlng]);
    }
  });

  return null;
};

export default MapClickHandler;
