// React Hooks:
import React, { useState, useEffect } from "react";
// Redux Toolkit Hooks:
import { useAppDispatch } from "../../../app/hooks";
// Redux Toolkit Actions & State:
import { viewportAreaAction } from "./mapFiltersBoxSlice";
// Leaflet Framework:
import { useMap, useMapEvents } from "react-leaflet";
// MUI Components:
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import L from "leaflet";

// Type Controller
interface MapFiltersBoxProps {
  filters: {
    allLayeres: boolean;
    markers: boolean;
    clustering: boolean;
    labels: boolean;
    pointsInViewport: boolean;
    updateByViewport: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      allLayeres: boolean;
      markers: boolean;
      clustering: boolean;
      labels: boolean;
      pointsInViewport: boolean;
      updateByViewport: boolean;
    }>
  >;
  refFG: any;
  refMC: any;
}

const MapFiltersBox: React.FC<MapFiltersBoxProps> = ({
  filters,
  setFilters,
  refFG,
  refMC,
}) => {
  const dispatch = useAppDispatch();

  const map = useMap();

  const [viewportArea, setViewportArea] = useState({
    north: map.getBounds().getNorth(),
    east: map.getBounds().getEast(),
    south: map.getBounds().getSouth(),
    west: map.getBounds().getWest(),
  });

  const [polygonEdit, setPolygonEdit] = useState<any>(null);
  const [existenceEdit, setExistenceEdit] = useState<any>(null);
  const [markerEdit, setMarkerEdit] = useState<any>(null);

  const [lastClustering, setLastClustering] = useState<boolean>(
    filters.clustering
  );

  useEffect(() => {
    dispatch(viewportAreaAction(viewportArea));
  }, [dispatch, viewportArea]);

  useEffect(() => {
    if (polygonEdit !== null) {
      polygonEdit.enable();
    }
    if (existenceEdit !== null) {
      existenceEdit.enable();
    }
    if (markerEdit !== null) {
      markerEdit.enable();
    }
  }, [polygonEdit, existenceEdit, markerEdit]);

  useEffect(() => {
    map.on("draw:toolbaropened", (e: any) => {
      if (polygonEdit !== null) {
        polygonEdit.revertLayers();
        polygonEdit.disable();
        setPolygonEdit(null);
      }
      if (existenceEdit !== null) {
        existenceEdit.revertLayers();
        existenceEdit.disable();
        setExistenceEdit(null);
      }
      if (markerEdit !== null) {
        markerEdit.revertLayers();
        markerEdit.disable();
        setMarkerEdit(null);
        setFilters((last) => ({ ...last, clustering: lastClustering }));
      }
    });
  }, [map, polygonEdit, existenceEdit, markerEdit, setFilters, lastClustering]);

  useMapEvents({
    moveend() {
      setViewportArea({
        north: map.getBounds().getNorth(),
        east: map.getBounds().getEast(),
        south: map.getBounds().getSouth(),
        west: map.getBounds().getWest(),
      });

      if (!!filters.updateByViewport) {
        console.log("center:");
        console.log(map.getCenter());
        console.log("north-east:");
        console.log(map.getBounds().getNorthEast());
        console.log("south-east:");
        console.log(map.getBounds().getSouthEast());
        console.log("south-west:");
        console.log(map.getBounds().getSouthWest());
        console.log("north-west:");
        console.log(map.getBounds().getNorthWest());
      }
    },
  });

  return (
    <Box
      sx={{
        direction: "ltr",
        width: "20%",
        minHeight: "fit-content",
        maxHeight: "70%",
        backgroundColor: "#818181",
        color: "white",
        p: "10px",
        borderRadius: "8px",
        position: "absolute",
        top: "150px",
        right: "10px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onMouseEnter={() => {
        map.dragging.disable();
        map.doubleClickZoom.disable();
      }}
      onMouseLeave={() => {
        map.dragging.enable();
        map.doubleClickZoom.enable();
      }}
    >
      <FormGroup>
        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Checkbox
              defaultChecked
              onChange={(e: any) => {
                setFilters((last) => ({
                  ...last,
                  allLayeres: e.target.checked,
                }));
                if (polygonEdit !== null) {
                  polygonEdit.revertLayers();
                  polygonEdit.disable();
                  setPolygonEdit(null);
                }
                if (existenceEdit !== null) {
                  existenceEdit.revertLayers();
                  existenceEdit.disable();
                  setExistenceEdit(null);
                }
                if (markerEdit !== null) {
                  markerEdit.revertLayers();
                  markerEdit.disable();
                  setMarkerEdit(null);
                }
              }}
              color="secondary"
            />
          }
          label="نمایش همه لایه ها"
        />

        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Checkbox
              defaultChecked
              onChange={(e: any) => {
                setFilters((last) => ({
                  ...last,
                  clustering: e.target.checked,
                }));
                setLastClustering(e.target.checked);
                if (polygonEdit !== null) {
                  polygonEdit.revertLayers();
                  polygonEdit.disable();
                  setPolygonEdit(null);
                }
                if (existenceEdit !== null) {
                  existenceEdit.revertLayers();
                  existenceEdit.disable();
                  setExistenceEdit(null);
                }
                if (markerEdit !== null) {
                  markerEdit.revertLayers();
                  markerEdit.disable();
                  setMarkerEdit(null);
                }
              }}
              color="secondary"
            />
          }
          label="نمایش کلسترینگ نقاط"
        />

        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Checkbox
              onChange={(e: any) => {
                setFilters((last) => ({
                  ...last,
                  labels: e.target.checked,
                }));
                if (polygonEdit !== null) {
                  polygonEdit.revertLayers();
                  polygonEdit.disable();
                  setPolygonEdit(null);
                }
                if (existenceEdit !== null) {
                  existenceEdit.revertLayers();
                  existenceEdit.disable();
                  setExistenceEdit(null);
                }
                if (markerEdit !== null) {
                  markerEdit.revertLayers();
                  markerEdit.disable();
                  setMarkerEdit(null);
                }
              }}
              color="secondary"
            />
          }
          label="نمایش برچسب ها"
        />

        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Checkbox
              defaultChecked
              onChange={(e: any) => {
                setFilters((last) => ({
                  ...last,
                  pointsInViewport: e.target.checked,
                }));
                if (polygonEdit !== null) {
                  polygonEdit.revertLayers();
                  polygonEdit.disable();
                  setPolygonEdit(null);
                }
                if (existenceEdit !== null) {
                  existenceEdit.revertLayers();
                  existenceEdit.disable();
                  setExistenceEdit(null);
                }
                if (markerEdit !== null) {
                  markerEdit.revertLayers();
                  markerEdit.disable();
                  setMarkerEdit(null);
                }
              }}
              color="secondary"
            />
          }
          label="نقاط موجود در محدوده مانیتور"
        />

        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Checkbox
              onChange={(e: any) => {
                setFilters((last) => ({
                  ...last,
                  updateByViewport: e.target.checked,
                }));
                if (polygonEdit !== null) {
                  polygonEdit.revertLayers();
                  polygonEdit.disable();
                  setPolygonEdit(null);
                }
                if (existenceEdit !== null) {
                  existenceEdit.revertLayers();
                  existenceEdit.disable();
                  setExistenceEdit(null);
                }
                if (markerEdit !== null) {
                  markerEdit.revertLayers();
                  markerEdit.disable();
                  setMarkerEdit(null);
                }
              }}
              color="secondary"
            />
          }
          label="بروزرسانی محدوده مانیتور با تغییر"
        />
      </FormGroup>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            fontSize: "13px",
            p: "6px",
            color: "#FFFF",
          }}
        >
          ویرایش چند ضلعی ها
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              if (polygonEdit !== null) {
                polygonEdit.revertLayers();
                polygonEdit.disable();
                setPolygonEdit(null);
              }
            }}
          >
            لغو
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              const editStop = document.querySelector(
                ".leaflet-right .leaflet-draw-actions li:nth-child(2) a"
              ) as HTMLElement;
              editStop?.click();

              if (polygonEdit !== null) {
                polygonEdit.revertLayers();
                polygonEdit.disable();
              }
              if (existenceEdit !== null) {
                existenceEdit.revertLayers();
                existenceEdit.disable();
                setExistenceEdit(null);
              }
              if (markerEdit !== null) {
                markerEdit.revertLayers();
                markerEdit.disable();
                setMarkerEdit(null);
                setFilters((last) => ({ ...last, clustering: lastClustering }));
              }

              const drawControl = new L.Control.Draw({
                edit: {
                  featureGroup: refFG.polygon,
                },
              });

              const editHandler = new L.EditToolbar.Edit(
                refMC,
                drawControl.options.edit
              );

              setPolygonEdit(editHandler);

              editHandler.enable();
            }}
          >
            ویرایش
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              const editStop = document.querySelector(
                ".leaflet-right .leaflet-draw-actions li:nth-child(2) a"
              ) as HTMLElement;
              editStop?.click();

              if (polygonEdit !== null) {
                polygonEdit.revertLayers();
                polygonEdit.disable();
              }
              if (existenceEdit !== null) {
                existenceEdit.revertLayers();
                existenceEdit.disable();
                setExistenceEdit(null);
              }
              if (markerEdit !== null) {
                markerEdit.revertLayers();
                markerEdit.disable();
                setMarkerEdit(null);
                setFilters((last) => ({ ...last, clustering: lastClustering }));
              }

              const drawControl = new L.Control.Draw({
                edit: {
                  featureGroup: refFG.polygon,
                },
              });

              const editHandler = new L.EditToolbar.Delete(
                refMC,
                drawControl.options.edit
              );

              setPolygonEdit(editHandler);

              editHandler.enable();
            }}
          >
            حذف
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              if (polygonEdit !== null) {
                polygonEdit.save();
                polygonEdit.disable();
                setPolygonEdit(null);
              }
            }}
          >
            ذخیره
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            fontSize: "13px",
            p: "6px",
            color: "#FFFF",
          }}
        >
          ویرایش موجودیت ها
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              if (existenceEdit !== null) {
                existenceEdit.revertLayers();
                existenceEdit.disable();
                setExistenceEdit(null);
              }
            }}
          >
            لغو
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              const editStop = document.querySelector(
                ".leaflet-right .leaflet-draw-actions li:nth-child(2) a"
              ) as HTMLElement;
              editStop?.click();

              if (polygonEdit !== null) {
                polygonEdit.revertLayers();
                polygonEdit.disable();
                setPolygonEdit(null);
              }
              if (existenceEdit !== null) {
                existenceEdit.revertLayers();
                existenceEdit.disable();
              }
              if (markerEdit !== null) {
                markerEdit.revertLayers();
                markerEdit.disable();
                setMarkerEdit(null);
                setFilters((last) => ({ ...last, clustering: lastClustering }));
              }

              const drawControl = new L.Control.Draw({
                edit: {
                  featureGroup: refFG.existence,
                },
              });

              const editHandler = new L.EditToolbar.Edit(
                refMC,
                drawControl.options.edit
              );

              setExistenceEdit(editHandler);
            }}
          >
            ویرایش
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              const editStop = document.querySelector(
                ".leaflet-right .leaflet-draw-actions li:nth-child(2) a"
              ) as HTMLElement;
              editStop?.click();

              if (polygonEdit !== null) {
                polygonEdit.revertLayers();
                polygonEdit.disable();
                setPolygonEdit(null);
              }
              if (existenceEdit !== null) {
                existenceEdit.revertLayers();
                existenceEdit.disable();
              }
              if (markerEdit !== null) {
                markerEdit.revertLayers();
                markerEdit.disable();
                setMarkerEdit(null);
                setFilters((last) => ({ ...last, clustering: lastClustering }));
              }

              const drawControl = new L.Control.Draw({
                edit: {
                  featureGroup: refFG.existence,
                },
              });

              const editHandler = new L.EditToolbar.Delete(
                refMC,
                drawControl.options.edit
              );

              setExistenceEdit(editHandler);
            }}
          >
            حذف
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              if (existenceEdit !== null) {
                existenceEdit.save();
                existenceEdit.disable();
                setExistenceEdit(null);
              }
            }}
          >
            ذخیره
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            fontSize: "13px",
            p: "6px",
            color: "#FFFF",
          }}
        >
          ویرایش نشانگرها
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              if (markerEdit !== null) {
                markerEdit.revertLayers();
                markerEdit.disable();
                setMarkerEdit(null);
                setFilters((last) => ({ ...last, clustering: lastClustering }));
              }
            }}
          >
            لغو
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              setFilters((last) => ({
                ...last,
                clustering: false,
              }));

              const editStop = document.querySelector(
                ".leaflet-right .leaflet-draw-actions li:nth-child(2) a"
              ) as HTMLElement;
              editStop?.click();

              if (polygonEdit !== null) {
                polygonEdit.revertLayers();
                polygonEdit.disable();
                setPolygonEdit(null);
              }
              if (existenceEdit !== null) {
                existenceEdit.revertLayers();
                existenceEdit.disable();
                setExistenceEdit(null);
              }
              if (markerEdit !== null) {
                markerEdit.revertLayers();
                markerEdit.disable();
              }

              const drawControl = new L.Control.Draw({
                edit: {
                  featureGroup: refFG.marker,
                },
              });

              const editHandler = new L.EditToolbar.Edit(
                refMC,
                drawControl.options.edit
              );

              setMarkerEdit(editHandler);
            }}
          >
            ویرایش
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              setFilters((last) => ({
                ...last,
                clustering: false,
              }));

              const editStop = document.querySelector(
                ".leaflet-right .leaflet-draw-actions li:nth-child(2) a"
              ) as HTMLElement;
              editStop?.click();

              if (polygonEdit !== null) {
                polygonEdit.revertLayers();
                polygonEdit.disable();
                setPolygonEdit(null);
              }
              if (existenceEdit !== null) {
                existenceEdit.revertLayers();
                existenceEdit.disable();
                setExistenceEdit(null);
              }
              if (markerEdit !== null) {
                markerEdit.revertLayers();
                markerEdit.disable();
              }

              const drawControl = new L.Control.Draw({
                edit: {
                  featureGroup: refFG.marker,
                },
              });

              const editHandler = new L.EditToolbar.Delete(
                refMC,
                drawControl.options.edit
              );

              setMarkerEdit(editHandler);
            }}
          >
            حذف
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              p: "2px",
              width: "23%",
              minWidth: "fit-content",
              fontSize: "12px",
            }}
            onClick={() => {
              if (markerEdit !== null) {
                markerEdit.save();
                markerEdit.disable();
                setMarkerEdit(null);
                setFilters((last) => ({ ...last, clustering: lastClustering }));
              }
            }}
          >
            ذخیره
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MapFiltersBox;
