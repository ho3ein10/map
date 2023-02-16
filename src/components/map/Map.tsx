// React Hooks:
import { useState, useEffect, useRef } from "react";
// Redux Toolkit Hooks:
import { useAppSelector } from "../../app/hooks";
// Redux Toolkit Actions & State:
import { mapFiltersBox } from "./map-filters-box/mapFiltersBoxSlice";
// Leaflet Framework:
import L, { LatLngExpression } from "leaflet";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  FeatureGroup,
  Polygon,
  Marker,
  Popup,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import LeafletRuler from "./leaflet-ruler/LeafletRuler";
import { EditControl } from "react-leaflet-draw";
// Leaflet Map mapLanguage:
import "./map-language/mapLanguage";
// MUI Components:
import { Container, Grid, Box } from "@mui/material";
// Components:
// import Filter from "../global/filter/Filter";
import MapFilter from "./map-filter/MapFilter";
import MapFiltersBox from "./map-filters-box/MapFiltersBox";
import MapCoordinates from "./map-coordinates/MapCoordinates";
import MarkerCluster from "./marker-cluster/MarkerCluster";
import HeatmapLayer from "react-leaflet-heatmap-layer-v3/lib/HeatmapLayer";
import { addressPointsSlice } from "./example-layers/realworld.10000";
// MUI Styles:
import { makeStyles } from "@mui/styles";
// Styles:
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Type Controller
interface LocationType {
  name: string;
  position: LatLngExpression;
  type: string;
  description: string;
}
interface LocationsType extends Array<LocationType> {}
declare module "leaflet" {
  interface ControlOptions {
    polygon?: any;
    edit?: any;
  }
  namespace control {
    function ruler(options?: any): any;
  }
}
declare module "leaflet-draw" {
  namespace EditToolbar {
    interface Delete {
      enable(): void;
      disable(): void;
      removeAllLayers(): void;
    }
    interface Edit {
      enable(): void;
      disable(): void;
      revertLayers(): void;
      save(): void;
    }
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.primary.dark,
    overflow: "hidden",
  },
  filterBox: {
    "&::-webkit-scrollbar": {
      borderRadius: "10px",
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "10px",
      backdropFilter: "blur(4px)",
      backgroundColor: "rgba(28, 33, 45, 0.4)",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "#747474",
    },
  },
  mapContainer: {
    direction: "ltr",
    position: "relative",
    borderRadius: "8px",
    "& .leaflet-popup-content": {
      textAlign: "center",
    },
    "& .leaflet-bottom": {
      bottom: "25px",
    },
    "& .leaflet-ruler": {
      width: "34px",
      height: "34px",
      cursor: "pointer",
    },
    "& .leaflet-control-layers-list": {
      direction: "rtl",
    },
  },
}));

const mapPosition: LatLngExpression | undefined = [35.7219, 51.3347];

const locationsSlice: LocationsType = [
  {
    name: "حسن",
    position: [35.7219, 51.2547],
    type: "person",
    description: "this is Hasan",
  },
  {
    name: "محمدعلی",
    position: [35.7219, 51.3547],
    type: "person",
    description: "this is M.A",
  },
  {
    name: "جواد",
    position: [35.7419, 51.313],
    type: "car",
    description: "this is Javad",
  },
  {
    name: "سجاد",
    position: [35.6919, 51.3347],
    type: "car",
    description: "this is Sajjad",
  },
  {
    name: "محمدحسین",
    position: [35.6719, 51.2847],
    type: "person",
    description: "this is M.H",
  },
  {
    name: "محمد",
    position: [35.7019, 51.3947],
    type: "person",
    description: "this is M",
  },
  {
    name: "فتاح",
    position: [35.7219, 51.3047],
    type: "car",
    description: "this is F",
  },
  {
    name: "بهروز",
    position: [35.7519, 51.3347],
    type: "car",
    description: "this is B",
  },
];

const polygonSlice:
  | LatLngExpression[]
  | LatLngExpression[][]
  | LatLngExpression[][][] = [
  [
    [35.7219, 51.2547],
    [35.6719, 51.2847],
    [35.6919, 51.3347],
    [35.7019, 51.3947],
    [35.7319, 51.3747],
    [35.7519, 51.3347],
    [35.7419, 51.2847],
  ],
  [
    [35.69740736520523, 51.66398608545122],
    [35.73669413479277, 51.72030114778254],
    [35.72527231965882, 51.77764636369309],
    [35.66730227411431, 51.757043292108484],
  ],
];

const markersSlice: { position: LatLngExpression; description: string }[] = [
  {
    position: [35.6419, 51.4347],
    description: "this is Mohammad hossein",
  },
  {
    position: [35.6219, 51.4247],
    description: "this is Fattah",
  },
  {
    position: [35.6219, 51.4447],
    description: "this is Mohammad",
  },
  {
    position: [35.6019, 51.4147],
    description: "this is Behrouz",
  },
];

const Map = () => {
  const classes = useStyles();

  const {
    viewportArea: { north, east, south, west },
  } = useAppSelector(mapFiltersBox);

  const refMC: any = useRef();
  const refFG: any = useRef();
  const polygonRefFG: any = useRef();
  const existenceRefFG: any = useRef();
  const markerRefFG: any = useRef();

  const [addressPoints, setAddressPoints] = useState(addressPointsSlice);
  const [locations, setLocations] = useState(locationsSlice);
  const [polygon, setPolygon] = useState(polygonSlice);
  const [markers, setMarkers] = useState(markersSlice);

  const [refMCState, setRefMCState] = useState<any>(null);
  const [refFGState, setRefFGState] = useState<any>(null);
  const [polygonRefFGState, setPolygonRefFGState] = useState<any>(null);
  const [existenceRefFGState, setExistenceRefFGState] = useState<any>(null);
  const [markerRefFGState, setMarkerRefFGState] = useState<any>(null);

  const [polygonData, setPolygonData] = useState<object[]>([]);
  const [mapFilterShow, setMapFilterShow] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    allLayeres: true,
    markers: true,
    clustering: true,
    labels: false,
    pointsInViewport: true,
    updateByViewport: false,
  });

  useEffect(() => {
    if (!!filters.pointsInViewport) {
      if (north !== null && east !== null && south !== null && west !== null) {
        setAddressPoints(
          addressPointsSlice.filter(
            (item: any) =>
              item[0] <= north &&
              item[0] >= south &&
              item[1] >= west &&
              item[1] <= east
          )
        );

        setLocations(
          locationsSlice.filter(
            (item: any) =>
              item.position[0] <= north &&
              item.position[0] >= south &&
              item.position[1] >= west &&
              item.position[1] <= east
          )
        );

        setPolygon(
          polygonSlice.filter(
            (item: any) =>
              item.map((i: any) => i[0]).find((r: any) => r <= north) <=
                north &&
              item.map((i: any) => i[0]).find((r: any) => r >= south) >=
                south &&
              item.map((i: any) => i[1]).find((r: any) => r >= west) >= west &&
              item.map((i: any) => i[1]).find((r: any) => r <= east) <= east
          )
        );

        setMarkers(
          markersSlice.filter(
            (item: any) =>
              item.position[0] <= north &&
              item.position[0] >= south &&
              item.position[1] >= west &&
              item.position[1] <= east
          )
        );
      }
    } else {
      setAddressPoints(addressPointsSlice);
      setLocations(locationsSlice);
      setPolygon(polygonSlice);
      setMarkers(markersSlice);
    }
  }, [filters.pointsInViewport, north, east, south, west]);

  useEffect(() => {
    setRefMCState(refMC.current);
    setRefFGState(refFG.current);
    setPolygonRefFGState(polygonRefFG.current);
    setExistenceRefFGState(existenceRefFG.current);
    setMarkerRefFGState(markerRefFG.current);

    // if (refFGState) {
    //   const firstPolygon: any | undefined = Object.values(
    //     refFGState._layers
    //   )[0];
    //   const firstId: number = firstPolygon._leaflet_id;
    //   const firstLatLngs: object[] = firstPolygon._latlngs;
    //   setPolygonData((last: object[]) => [
    //     ...last,
    //     { id: firstId, latlngs: firstLatLngs },
    //   ]);
    // }
  }, [refFGState, polygonRefFGState, existenceRefFGState, markerRefFGState]);

  const customMarker = () => {
    return new L.Icon({
      iconUrl: require(`../../assets/images/map-marker-icon.png`),
      iconAnchor: [25, 49],
      popupAnchor: [0, -49],
      iconSize: [52, 50],
    });
  };

  const getIcon = (type: string) => {
    return new L.Icon({
      iconUrl: require(`../../assets/images/${type}-marker.png`),
      iconAnchor: [17, 49],
      popupAnchor: [0, -49],
      iconSize: [37, 50],
    });
  };

  const _onCreate = (e: any) => {
    const { layerType, layer } = e;

    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setPolygonData((last: object[]) => [
        ...last,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }

    setMapFilterShow(true);
  };

  const _onEdited = (e: any) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }: any) => {
      return setPolygonData((last: object[]) =>
        last.map((l: any) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });

    setMapFilterShow(true);
  };

  const _onDeleted = (e: any) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }: any) => {
      return setPolygonData((last: object[]) =>
        last.filter((l: any) => l.id !== _leaflet_id)
      );
    });

    setMapFilterShow(false);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", p: { xs: 0 } }}
      className={classes.container}
    >
      <Grid container sx={{ width: "100%", height: "100%" }}>
        <Grid
          item
          xs={2.5}
          sx={{
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            direction: "rtl",
          }}
          className={classes.filterBox}
        >
          {/* <Filter
            mapData={{
              refMC: refMCState,
              refFG: refFGState,
            }}
          /> */}
        </Grid>
        <Grid item xs={9.5} sx={{ height: "100%" }}>
          <Box
            sx={{
              padding: "10px",
              height: "100%",
              bgcolor: "#F3F6F9",
              borderRadius: "0 0 8px 0",
              overflow: "hidden",
              position: "relative",
            }}
            id="myMap"
          >
            <MapContainer
              ref={refMC}
              center={mapPosition}
              zoom={12}
              zoomControl={false}
              attributionControl={false}
              style={{ width: "100%", height: "100%" }}
              className={`map ${classes.mapContainer}`}
            >
              <ZoomControl
                position="topleft"
                zoomInTitle="بزرگنمایی"
                zoomOutTitle="کوچک نمایی"
              />
              <LeafletRuler />

              <LayersControl position="bottomright">
                <LayersControl.BaseLayer name="Light map" checked>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Dark map">
                  <TileLayer
                    attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>

                <LayersControl.Overlay
                  checked={filters.allLayeres ? true : false}
                  name="ترسیمات"
                >
                  <FeatureGroup ref={refFG}>
                    <EditControl
                      position="topright"
                      onCreated={_onCreate}
                      onEdited={_onEdited}
                      onDeleted={_onDeleted}
                      draw={{
                        rectangle: true,
                        polyline: true,
                        circle: true,
                        circlemarker: true,
                        marker: {
                          icon: customMarker(),
                        },
                        polygon: true,
                      }}
                      edit={{
                        edit: true,
                        remove: true,
                      }}
                    />
                  </FeatureGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay
                  checked={filters.allLayeres ? true : false}
                  name="نقشه حرارتی"
                >
                  <FeatureGroup>
                    <HeatmapLayer
                      // fitBoundsOnLoad
                      fitBoundsOnUpdate
                      points={addressPoints}
                      // gradient={{
                      //   0.2: "#ffffb2",
                      //   0.4: "#fd8d3c",
                      //   0.6: "#fd8d3c",
                      //   0.8: "#f03b20",
                      //   1: "#bd0026",
                      // }}
                      longitudeExtractor={(m: any) => m[1]}
                      latitudeExtractor={(m: any) => m[0]}
                      intensityExtractor={(m: any) => parseFloat(m[2])}
                    />
                  </FeatureGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay
                  checked={filters.allLayeres ? true : false}
                  name="چند ضلعی ها"
                >
                  <FeatureGroup ref={polygonRefFG}>
                    {polygon.map((item, index) => (
                      <Polygon
                        key={index}
                        pathOptions={{ color: "#FFD831", fillColor: "inherit" }}
                        positions={item}
                        eventHandlers={{
                          click: (e) => {
                            console.log("polygon clicked", e);
                            var seeArea = L.GeometryUtil.geodesicArea(
                              e.sourceTarget._latlngs[0]
                            );
                            console.log(seeArea + " m2");
                          },
                        }}
                      />
                    ))}
                  </FeatureGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay
                  checked={filters.allLayeres ? true : false}
                  name="موجودیت ها"
                >
                  <FeatureGroup ref={existenceRefFG}>
                    {locations.map((item, index) => (
                      <Marker
                        position={item.position}
                        key={index}
                        icon={getIcon(item.type)}
                      >
                        <Popup offset={[1.5, 5]}>{item.name}</Popup>
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
                    ))}
                  </FeatureGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay
                  checked={filters.allLayeres ? true : false}
                  name="نشانگرها"
                >
                  <FeatureGroup ref={markerRefFG}>
                    <MarkerCluster markers={markers} filters={filters} />
                  </FeatureGroup>
                </LayersControl.Overlay>
              </LayersControl>

              <MapFiltersBox
                filters={filters}
                setFilters={setFilters}
                refFG={{
                  polygon: polygonRefFGState,
                  existence: existenceRefFGState,
                  marker: markerRefFGState,
                }}
                refMC={refMCState}
              />

              <MapCoordinates />
            </MapContainer>
            <MapFilter
              mapData={{
                refMC: refMCState,
                refFG: refFGState,
                mapFilterShow: mapFilterShow,
                setMapFilterShow: setMapFilterShow,
                polygonData: polygonData,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Map;
