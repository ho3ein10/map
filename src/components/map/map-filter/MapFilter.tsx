// React Hooks:
import React, { useState } from "react";
// Leaflet Framework:
import L from "leaflet";
// MUI Components:
import { Fade, Box, Typography, TextField, Button } from "@mui/material";
// MUI Styles:
import { makeStyles } from "@mui/styles";

// Type Controller
interface MapFilterProps {
  mapData: {
    refMC: any;
    refFG: any;
    mapFilterShow: boolean;
    setMapFilterShow: React.Dispatch<React.SetStateAction<boolean>>;
    polygonData: object[];
  };
}

const useStyles = makeStyles((theme) => ({
  mapFilterBox: {
    width: "30%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
    direction: "rtl",
    backgroundColor: "#E3E3E3",
    color: "#525C6E",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: theme.shadows[3],
  },
  fieldStyle: {
    borderRadius: "5px",
    backgroundColor: "#F3F6F9",
    "& .MuiSvgIcon-root": {
      marginLeft: "5px",
    },
    "& .MuiOutlinedInput-root": {
      color: theme.palette.primary.dark,
      paddingLeft: "0px",
      "& fieldset": {
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
        borderWidth: 1.5,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#AEAEAE",
        borderWidth: 1.5,
        backgroundColor: "transparent",
      },
    },
  },
}));

const MapFilter: React.FC<MapFilterProps> = ({ mapData }) => {
  const classes = useStyles();

  const [filterName, setFilterName] = useState("");

  return (
    <Fade in={mapData.mapFilterShow}>
      <Box className={classes.mapFilterBox}>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              width: "100%",
              fontSize: "13px",
              pb: "6px",
              px: "8px",
            }}
          >
            نام فیلتر
          </Typography>

          <TextField
            placeholder="تایپ کنید"
            name="filterName"
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}
            size={"small"}
            sx={{
              input: {
                py: "8px",
                px: "8px",
                fontSize: "12px",
              },
              width: "100%",
              fontSize: "12px",
              mb: "8px",
            }}
            className={classes.fieldStyle}
          />
        </Box>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              console.log(filterName);
              console.log(mapData.polygonData);
              setFilterName("");

              const drawControl = new L.Control.Draw({
                edit: {
                  featureGroup: mapData.refFG,
                },
              });
              const deleteHandler = new L.EditToolbar.Delete(
                mapData.refMC,
                drawControl.options.edit
              );
              if (Object.keys(mapData.refFG._layers).length) {
                deleteHandler.enable();
                deleteHandler.removeAllLayers();
                deleteHandler.disable();
              }

              mapData.setMapFilterShow(false);
            }}
            sx={{
              width: "40%",
              minWidth: "max-content",
              px: 1.5,
              py: "6px",
              mr: "8px",
              fontSize: "13px",
            }}
          >
            ذخیره
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setFilterName("");
              mapData.setMapFilterShow(false);
            }}
            sx={{
              width: "40%",
              minWidth: "max-content",
              px: 1.5,
              py: "6px",
              mr: "8px",
              fontSize: "13px",
              color: "#D32F2F",
              backgroundColor: "inherit",
              border: "1px solid #D32F2F",
              boxShadow: "none",
              "&:hover": {
                color: "#FFFF",
              },
            }}
          >
            انصراف
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default MapFilter;
