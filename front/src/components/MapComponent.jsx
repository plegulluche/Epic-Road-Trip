import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
import axios from 'axios';
import requests from '../requests/Requests';
import { getDirections } from '../requests/axiosMethods/Directions';
import { useMapEvent } from 'react-leaflet';
import MapClickHandler from './MapClickHandler';
import polyline from "@mapbox/polyline";

import L from 'leaflet';
//import env from 'react-dotenv';


const MapComponent = () => {
    const [mapCenter, setMapCenter] = useState(null); // Default latitude and longitude
    const [zoom, setZoom] = useState(13);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [route, setRoute] = useState(null);
    const [locationAccuracy, setLocationAccuracy] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLocationAccuracy(position.coords.accuracy)
                const { latitude, longitude } = position.coords;
                setMapCenter([latitude, longitude]);
            });
        }
    }, []);
    console.log(origin)
    const getRouteCoordinates = async (origin, destination, waypoints) => {
        const coordinates = {
            origin: {
                lat: origin.lat,
                lng: origin.lng
            },
            destination: {
                lat: destination.lat,
                lng: destination.lng
            },
            waypoints: waypoints.map(waypoint => ({
                lat: waypoint.lat,
                lng: waypoint.lng
            }))
        }
        try {
            const response = await getDirections(requests.GetDirections, coordinates);
            const data = response.data.newDirection;
            const geometry = data.routes[0].geometry;
            const routeCoordinates = polyline.decode(geometry);
            return routeCoordinates;
        } catch (error) {
            console.error(error);
        }
    };




    const updateOrigin = async (newOrigin) => {
        setOrigin(newOrigin);
        if (destination) {
            const routeCoordinates = await getRouteCoordinates(newOrigin, destination, waypoints);
            setRoute(routeCoordinates);
        }
    };

    const updateDestination = async (newDestination) => {
        setDestination(newDestination);
        if (origin) {
            const routeCoordinates = await getRouteCoordinates(origin, newDestination, waypoints);
            setRoute(routeCoordinates);
        }
    };

    const updateWaypoints = async (newWaypoints) => {
        setWaypoints(newWaypoints);
        if (origin && destination) {
            const routeCoordinates = await getRouteCoordinates(origin, destination, newWaypoints);
            setRoute(routeCoordinates);
        }
    };



    return (
        mapCenter &&
        <MapContainer
            center={mapCenter}
            zoom={zoom}
            style={{ height: '100vh', width: '100%' }}
            whenReady={() => {
                if (!origin) {
                    alert('Click on the map to set the origin');
                }
            }}
            
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler
                origin={origin}
                destination={destination}
                waypoints={waypoints}
                updateOrigin={updateOrigin}
                updateDestination={updateDestination}
                updateWaypoints={updateWaypoints}
            />
            {origin && <Marker position={origin}><Popup>Origin</Popup></Marker>}
            {destination && <Marker position={destination}><Popup>Destination</Popup></Marker>}
            {waypoints.map((waypoint, index) => (
                <Marker key={index} position={waypoint}>
                    <Popup>Waypoint {index + 1}</Popup>
                </Marker>
            ))}
            {mapCenter && <CustomCircleMarker center={mapCenter} baseRadius={locationAccuracy} pathOptions={{ color: '#00fffb' }}><Popup>Current Location Radius</Popup></CustomCircleMarker>}
            {mapCenter && <CustomCircleMarker center={mapCenter} baseRadius={locationAccuracy} pathOptions={{ color: '#ff00c3'}}><Popup>Current Location Radius</Popup></CustomCircleMarker>}
            {route && <Polyline positions={route} />}
        </MapContainer>

    );

};

function CustomCircleMarker({ center, baseRadius, pathOptions, fillCircle }) {
    const map = useMap();
    const [zoom, setZoom] = useState(map.getZoom());

    useEffect(() => {
        const zoomListener = () => {
            setZoom(map.getZoom());
        };
        map.on('zoom', zoomListener);
        return () => {
            map.off('zoom', zoomListener);
        };
    }, [map]);

    function inverseNumber(x) {
        return (18 - x) + 5 ;
    }

    useEffect(() => {
      const circle = L.circle(center, {
        radius: baseRadius * inverseNumber(zoom),
        ...pathOptions,
        fill: fillCircle,
        fillColor: fillCircle ? pathOptions.color : null,
      }).addTo(map);
  
      return () => {
        map.removeLayer(circle);
      };
    }, [map, center, baseRadius, pathOptions, fillCircle]);
  
    return null;
  }

export default MapComponent;