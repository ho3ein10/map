// React Hooks:
import { useState, useEffect } from "react";
// PropTypes:
import PropTypes from "prop-types";
// Leaflet Framework:
import L from "leaflet";
import { useMap, Marker, Tooltip } from "react-leaflet";
// Styles:
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Type Controller
interface MarkerClusterProps {
  markers: any;
  filters: {
    allLayeres: boolean;
    clustering: boolean;
    labels: boolean;
  };
}

const markerClusters = L.markerClusterGroup();

const customMarker = new L.Icon({
  iconUrl: require(`../../../assets/images/map-marker-icon.png`),
  iconAnchor: [25, 49],
  popupAnchor: [0, -49],
  iconSize: [52, 50],
});

const MarkerCluster: React.FC<MarkerClusterProps> = ({ markers, filters }) => {
  const map = useMap();

  const [overlayAdd, setOverlayAdd] = useState(true);

  useEffect(() => {
    map.on("overlayadd", (e: any) => {
      if (e.name === "نشانگرها") {
        setOverlayAdd(true);
      }
    });
    map.on("overlayremove", (e: any) => {
      if (e.name === "نشانگرها") {
        setOverlayAdd(false);
      }
    });

    if (filters.clustering) {
      markerClusters.clearLayers();

      if (overlayAdd) {
        markers.forEach(({ position, description }: any) => {
          if (filters.labels) {
            L.marker(new L.LatLng(position[0], position[1]), {
              icon: customMarker,
            })
              .addTo(markerClusters)
              .bindTooltip(description, {
                direction: "bottom",
                offset: [1.5, 5],
                opacity: 0.9,
                permanent: true,
              });
          } else {
            L.marker(new L.LatLng(position[0], position[1]), {
              icon: customMarker,
            }).addTo(markerClusters);
          }
        });
      }

      map.addLayer(markerClusters);
    } else {
      map.removeLayer(markerClusters);
    }
  }, [markers, map, filters.clustering, filters.labels, overlayAdd]);

  return filters.clustering
    ? null
    : markers.map((item: any, index: any) => (
        <Marker position={item.position} key={index} icon={customMarker}>
          {filters.labels && (
            <Tooltip
              direction="bottom"
              offset={[1.5, 5]}
              opacity={0.9}
              permanent
            >
              {item.description}
            </Tooltip>
          )}
        </Marker>
      ));
};

MarkerCluster.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.arrayOf(PropTypes.number).isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default MarkerCluster;
