// React Hooks:
import React, { useState } from "react";
// Leaflet Framework:
import { useMap, useMapEvents } from "react-leaflet";
// MUI Components:
import { Box, Typography } from "@mui/material";

const MapCoordinates = () => {
  const map = useMap();

  const [zoomLevel, setZoomLevel] = useState(map.getZoom());
  const [coordinates, setCoordinates] = useState({
    lat: map.getCenter().lat,
    long: map.getCenter().lng,
  });

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
    mousemove(e) {
      setCoordinates((last) => ({ ...last, lat: e.latlng.lat }));
      setCoordinates((last) => ({ ...last, long: e.latlng.lng }));
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "25px",
        backgroundColor: "rgba(130,130,130,0.9)",
        color: "white",
        p: "2px",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignzitems: "center",
          mr: "10px",
        }}
      >
        <Typography
          sx={{
            width: "200px",
            fontSize: "14px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Lat:
          <Box component="span" sx={{ color: "aqua", mr: "8px" }}>
            {coordinates.lat > 0 ? "+" + coordinates.lat : coordinates.lat}
          </Box>
        </Typography>
        <Typography
          sx={{
            width: "200px",
            fontSize: "14px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Long:
          <Box component="span" sx={{ color: "aqua", mr: "8px" }}>
            {coordinates.long > 0 ? "+" + coordinates.long : coordinates.long}
          </Box>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignzitems: "center",
          ml: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Zoom Level:
          <Box component="span" sx={{ color: "aqua", mr: "8px" }}>
            {zoomLevel}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default MapCoordinates;
