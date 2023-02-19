// React Hooks:
import React, { useState } from "react";
// Leaflet Framework:
import { useMap, useMapEvents } from "react-leaflet";
// MUI Components:
import { Box, Typography, useTheme } from "@mui/material";

const CoordinatesBox = () => {
  const theme = useTheme();
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
        backgroundColor: "rgba(0,0,0,0.7)",
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
          justifyContent: "flex-start",
          alignzitems: "center",
          mr: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignzitems: "center",
            width: "240px",
            fontSize: "14px",
            ml:"8px",
            [theme.breakpoints.down("sm")]: {
              width: "210px",
              fontSize: "12px",
            },
            [theme.breakpoints.down(530)]: {
              width: "180px",
            },
            [theme.breakpoints.down(480)]: {
              width: "155px",
            },
            [theme.breakpoints.down(420)]: {
              width: "135px",
            },
            [theme.breakpoints.down(380)]: {
              width: "100px",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "inherit",
              whiteSpace: "nowrap",
              [theme.breakpoints.down(420)]: {
                display: "none",
              },
            }}
          >
            عرض جغرافیایی :
          </Typography>
          <Typography
            sx={{
              fontSize: "inherit",
              whiteSpace: "nowrap",
              [theme.breakpoints.up(420)]: {
                display: "none",
              },
            }}
          >
            عرض :
          </Typography>

          <Typography
            sx={{
              fontSize: "inherit",
              color: "aqua",
              mr: "6px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {coordinates.lat > 0 ? "+" + coordinates.lat : coordinates.lat}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignzitems: "center",
            width: "240px",
            fontSize: "14px",
            [theme.breakpoints.down("sm")]: {
              width: "210px",
              fontSize: "12px",
            },
            [theme.breakpoints.down(530)]: {
              width: "180px",
            },
            [theme.breakpoints.down(480)]: {
              width: "155px",
            },
            [theme.breakpoints.down(420)]: {
              width: "135px",
            },
            [theme.breakpoints.down(380)]: {
              width: "100px",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "inherit",
              whiteSpace: "nowrap",
              [theme.breakpoints.down(420)]: {
                display: "none",
              },
            }}
          >
            طول جغرافیایی :
          </Typography>
          <Typography
            sx={{
              fontSize: "inherit",
              whiteSpace: "nowrap",
              [theme.breakpoints.up(420)]: {
                display: "none",
              },
            }}
          >
            طول :
          </Typography>

          <Typography
            sx={{
              fontSize: "inherit",
              color: "aqua",
              mr: "6px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {coordinates.long > 0 ? "+" + coordinates.long : coordinates.long}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignzitems: "center",
          ml: "10px",
          fontSize: "14px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          بزرگ نمایی :
        </Typography>

        <Typography
          sx={{
            fontSize: "inherit",
            color: "aqua",
            mr: "6px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {zoomLevel}
        </Typography>
      </Box>
    </Box>
  );
};

export default CoordinatesBox;