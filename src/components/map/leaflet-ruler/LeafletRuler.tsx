// React Hooks:
import { useEffect } from "react";
// Leaflet Framework:
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-ruler/src/leaflet-ruler.css";
import "leaflet-ruler/src/leaflet-ruler";

const LeafletRuler = () => {
  const map = useMap();

  useEffect(() => {
    const options = {
      position: "topleft",
      circleMarker: {               // Leaflet circle marker options for points used in this plugin
        color: 'red',
        radius: 2
      },
      lineStyle: {                  // Leaflet polyline options for lines used in this plugin
        color: 'red',
        dashArray: '1,6'
      },
      lengthUnit: {                 // You can use custom length units. Default unit is kilometers.
        display: 'km',              // This is the display value will be shown on the screen. Example: 'meters'
        decimal: 3,                 // Distance result will be fixed to this value. 
        factor: null,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)  
        label: 'Distance:'           
      },
      angleUnit: {
        display: '&deg;',           // This is the display value will be shown on the screen. Example: 'Gradian'
        decimal: 2,                 // Bearing result will be fixed to this value.
        factor: null,                // This option is required to customize angle unit. Specify solid angle value for angle unit. Example: 400 (for gradian).
        label: 'Bearing:'
      }
    };

    if (!map) return;

    L.control.ruler(options).addTo(map);

  }, [map]);

  return null;
};

export default LeafletRuler;
