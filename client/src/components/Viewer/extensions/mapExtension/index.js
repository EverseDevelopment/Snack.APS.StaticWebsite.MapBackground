import React, {useState, useRef, useCallback} from 'react';
import {connect} from 'react-redux';
import mapboxgl from "mapbox-gl";
// Material UI
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
//Material Icon
import RoomIcon from '@material-ui/icons/Room';
//React MapBox
import MapGL, {FlyToInterpolator, Marker} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
// Redux actions
import {
    placeGeolocationMap,
    setMapType,
    setMapPosition,
    setRotationValue,
    setScaleValue,
    setMapDimension
} from '../../../../actions/viewerActions';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

function rotationLabelFormat(value) {
    return `${value}°`;
}

function scaleLabelFormat(value) {
    return value;
}

const panelContent = (props) => {

    const [mapType, setMapType] = useState(false)
    const [hasMap, setHasMap] = useState(false)
    const [mapDimension, setMapDimension] = useState(false);

    // For mini map rotation and scale
    const [rotationValue, setRotationValue] = useState(0);
    const [scaleValue, setScaleValue] = useState(1);
    const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v11");
    const [markerValue, setMarkerValue] = useState(null);

    const handleRotationChange = (event, newValue) => {
        setRotationValue(newValue);
    };

    const handleScaleChange = (event, newValue) => {
        setScaleValue(newValue);
    }

    const handleRotationCommit = (event, value) => {
        setViewport(prevState => ({
            ...prevState,
            bearing: -value
        }));
        props.setRotationValue(value);
    }

    const handleScaleCommit = (event, value) => {
        props.setScaleValue(value);
    }

    const [viewport, setViewport] = useState({
        latitude: 52.52,
        longitude: 13.4,
        zoom: 8,
        transitionInterpolator: new FlyToInterpolator()
    });

    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        async (newViewport) => {
            const geocoderDefaultOverrides = {transitionDuration: 1000};
            props.setMapPosition({lat: newViewport.latitude, lng: newViewport.longitude});
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        },
        [handleViewportChange]
    );

    const handleMapClick = async (e) => {
        if (e.target.classList.contains('overlays')) {
            setMarkerValue({lat: e.lngLat[1], lng: e.lngLat[0]})
            let coordinate = viewport;
            coordinate.longitude = e.lngLat[0];
            coordinate.latitude = e.lngLat[1];
            setViewport({...coordinate, transitionDuration: 1000});
            props.setMapPosition({lat: e.lngLat[1], lng: e.lngLat[0]});
        }
    }

    const handleSetMap = () => {
        setHasMap(!hasMap);
        props.viewer.setDisplayEdges(!hasMap)
        props.placeGeolocationMap(!hasMap)
    }

    const handleMapType = () => {
        const map = !mapType ? "mapbox://styles/mapbox/satellite-v9" : "mapbox://styles/mapbox/streets-v11";
        setMapStyle(map);
        setMapType(!mapType);
        props.setMapType(!mapType)
    }

    const handleMapDimensionType = () => {
        setMapDimension(!mapDimension);
        props.setMapDimension(!mapDimension);
    }

    const coordinatesGeocoder1 = useCallback(
        (query) => {
            return coordinatesGeocoder(query)
        }, []
    )
    const coordinatesGeocoder = (query) => {
        let matches = query.match(
            /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
        );
        if (!matches) {
            return null;
        }

        function coordinateFeature(lng, lat) {
            return {
                center: [lng, lat],
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                place_name: 'Lat: ' + lat + ' Lng: ' + lng,
                place_type: ['coordinate'],
                properties: {},
                type: 'Feature'
            };
        }

        let coord1 = Number(matches[1]);
        let coord2 = Number(matches[2]);
        let geocodes = [];

        if (coord1 < -90 || coord1 > 90) {
            // must be lng, lat
            geocodes.push(coordinateFeature(coord1, coord2));
        }

        if (coord2 < -90 || coord2 > 90) {
            // must be lat, lng
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        if (geocodes.length === 0) {
            // else could be either lng, lat or lat, lng
            geocodes.push(coordinateFeature(coord1, coord2));
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        return geocodes;
    };

    return (
        <div style={{height: "100%"}}>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                mapStyle={mapStyle}
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onClick={handleMapClick}
            >
                <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    localGeocoder={coordinatesGeocoder1}
                    zoom={12}
                    position="top-right"
                    clearOnBlur={true}
                />
                {markerValue && (
                    <Marker longitude={markerValue.lng} latitude={markerValue.lat} offsetLeft={-23} offsetTop={-43}>
                        <RoomIcon color="primary" style={{fontSize: 45}}/>
                    </Marker>
                )}
            </MapGL>
            <Typography component="div" className="map-switch-back-map">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Display Map</Grid>
                    <Grid item>
                        <AntSwitch checked={hasMap} onChange={() => {
                            handleSetMap()
                        }} name="checkedC"/>
                    </Grid>
                </Grid>
            </Typography>
            <Typography component="div" className="map-switch-dimension-type">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>2D</Grid>
                    <Grid item>
                        <AntSwitch checked={mapDimension} onChange={() => {
                            handleMapDimensionType()
                        }} name="checkedC"/>
                    </Grid>
                    <Grid item>3D</Grid>
                </Grid>
            </Typography>
            <Typography component="div" className="map-switch-map-type">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Street</Grid>
                    <Grid item>
                        <AntSwitch checked={mapType} onChange={() => {
                            handleMapType()
                        }} name="checkedC"/>
                    </Grid>
                    <Grid item>Terrain</Grid>
                </Grid>
            </Typography>
            <Typography component="div" className="map-rotation-regulator">
                <span id="rotating-slider">
                    Rotate
                </span>
                <Slider
                    value={rotationValue}
                    min={0}
                    step={1}
                    max={360}
                    // scale={(x) => x ** 10}
                    getAriaValueText={rotationLabelFormat}
                    valueLabelFormat={rotationLabelFormat}
                    onChange={handleRotationChange}
                    onChangeCommitted={handleRotationCommit}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                    className="rotating-slider"
                />
            </Typography>
            <Typography component="div" className="map-scale-regulator">
                <span id="scale-slider">
                    Scale
                </span>
                <Slider
                    value={scaleValue}
                    min={0}
                    step={0.1}
                    max={2}
                    // scale={(x) => x ** 10}
                    getAriaValueText={scaleLabelFormat}
                    valueLabelFormat={scaleLabelFormat}
                    onChange={handleScaleChange}
                    onChangeCommitted={handleScaleCommit}
                    valueLabelDisplay="auto"
                    aria-labelledby="scale-slider"
                    className="scale-slider"
                />
            </Typography>
        </div>
    )

}

const mapStateToProps = state => {
    const {geoJson} = state.viewer;
    return {geoJson}
}

export default connect(mapStateToProps,
    {
        placeGeolocationMap,
        setMapType,
        setMapPosition,
        setRotationValue,
        setScaleValue,
        setMapDimension
    })(panelContent);
