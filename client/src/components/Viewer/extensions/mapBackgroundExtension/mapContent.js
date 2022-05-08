/* global Autodesk, THREE */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {getGeoJson} from "../../../../services/apiHelper";

let jsonData = null;
// Consts for the scale of map
const scale2D = 4.068;
const pngSize = 512;
const zoomLevel = 16;
let tiles;
let mergeGeometry;
// latitude and longitude with Slippy map
let lng;
let lat;
let boundingBoxHeight;
let offsetLat;
let offsetLng;

const lon2tile = (lon, zoom) => {
    return (Math.floor((lon + 180) / 360 * Math.pow(2, zoomLevel)));
}

const lat2tile = (lat, zoom) => {
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoomLevel)));
}

// const lon2tileAsDecimal = (lon) => {
//     return ((lon + 180) / 360 * Math.pow(2, zoomLevel) % 1);
// }

// const lat2tileAsDecimal = (lat) => {
//     return ((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoomLevel) % 1);
// }


const tile2long = (x) => {
    return (x / Math.pow(2, zoomLevel) * 360 - 180);
}

const tile2lat = (y) => {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoomLevel);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}

let buildingsmesh;


const mapContent = (props) => {

    const quad = async (x, y) => {
        const mapType = props.mapType === 0 ? 'streets-v11' : 'satellite-streets-v11';
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(pngSize, pngSize, 5),
            new THREE.MeshPhongMaterial({
                color: 0xe6e6e6,
                map: (THREE.ImageUtils.loadTexture(`https://api.mapbox.com/styles/v1/mapbox/${mapType}/tiles/512/16/${lng + x}/${lat - y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`))
            })
        );
        mesh.position.set(x * pngSize, y * pngSize, 0);
        mesh.geometry.center();
        return mesh;
    }

    const meshBuildings = async () => {
        if (!props.viewer.overlays.hasScene('buildingScene')) {
            props.viewer.overlays.addScene('buildingScene');
        }
        const loadBalanceOptions = ["a", "b", "c", "d"];
        let apiCount = 0;
        let balanceOption
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (apiCount < 4) {
                    balanceOption = loadBalanceOptions[apiCount]
                } else if (apiCount >= 4 && apiCount < 8) {
                    balanceOption = loadBalanceOptions[apiCount - 4]
                } else {
                    balanceOption = loadBalanceOptions[0];
                }
                await getGoeJsonAPI(x, y, balanceOption);
                apiCount++;
            }
        }
    }

    const getGoeJsonAPI = async(x, y, balanceOption) => {
        await getGeoJson({lng: lng + x, lat: lat - y}, balanceOption)
        .then(async (geojson) => {
            if (geojson.status === 200) {
                if (geojson.data && geojson.data.features) {
                    if (!jsonData) {
                        jsonData = geojson.data.features;
                    } else {
                        jsonData = jsonData.concat(geojson.data.features)
                    }
                }
                if (jsonData && x === 1 && y === 1) {
                    await build3DMap(jsonData, x, y);
                }
            }
        })
        .catch(error => {
            throw error
        })
    }

    async function build3DMap(data, x, y) {
        try {
            var features = data;
            mergeGeometry = new THREE.Geometry();

            const cornerValues = [{x: -1000.5, y: 1000.5, color: 0xff0000}, {
                x: 1000.5,
                y: 10.5,
                color: 0xff00ff
            }, {x: 1000.5, y: -1000.5, color: 0xffff00}, {x: -1000.5, y: -1000.5, color: 0x002147}]
            for (var j = 0; j < cornerValues.length; j++) {
                let cornerX = tile2long(lng + 0.5 + cornerValues[j].x, zoomLevel);
                let cornerY = tile2lat(lat + 0.5 + cornerValues[j].y, zoomLevel);
                let data = {
                    id: `949631`,
                    type: "Feature",
                    properties: {
                        height: 1,
                        levels: 5,
                        type: "apartments"
                    },
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [cornerX, cornerY],
                                [cornerX, cornerY + 0.00005],
                                [cornerX + 0.00005, cornerY + 0.00005],
                                [cornerX + 0.00005, cornerY]
                            ]
                        ]
                    }
                };
                features.push(data);
            }


            for (var i = 0; i < features.length; i++) {
                if (features[i].geometry.coordinates[0].length > 2) {
                    var boxGeometry = await RenderCoordinates(features[i]);
                    mergeGeometry.merge(boxGeometry, boxGeometry.matrix);
                }
            }

            const materialBuildings = new THREE.MeshPhongMaterial({color: 0x7b7167});

            buildingsmesh = await new THREE.Mesh(mergeGeometry, materialBuildings);

            props.viewer.overlays.addMesh(buildingsmesh, 'buildingScene');
            buildingsmesh.geometry.computeBoundingBox();
            const heightPlane3D = (buildingsmesh.geometry.boundingBox.min.z + buildingsmesh.geometry.boundingBox.max.z) / 2
            buildingsmesh.position.set(-offsetLng, offsetLat, heightPlane3D + boundingBoxHeight);
            buildingsmesh.geometry.center();
        } catch (error) {
            throw error;
        }
    }


    function calculatePixelAxis(coordinate) {
        const longitude = coordinate[0];
        const latitude = coordinate[1];
        var sinLatitude = Math.sin(latitude * Math.PI / 180);
        var pixelX = ((longitude + 180) / 360) * pngSize * scale2D * Math.pow(2, zoomLevel);
        var pixelY = -(0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI)) * pngSize * scale2D * Math.pow(2, zoomLevel);
        return {pixelX, pixelY}
    }

    const RenderCoordinates = async (element) => {

        const shape = new THREE.Shape();
        const position = calculatePixelAxis(element.geometry.coordinates[0][0]);

        shape.moveTo(position.pixelX, position.pixelY);
        let positionValue, x, y;
        for (var i = 1; i < element.geometry.coordinates[0].length; i++) {
            positionValue = calculatePixelAxis(element.geometry.coordinates[0][i]);
            x = positionValue.pixelX;
            y = positionValue.pixelY;
            shape.lineTo(x, y);
        }

        let buildingHeight;
        if (element.properties.height) {
            buildingHeight = element.properties.height * 3.28084
        } else if (element.properties.levels) {
            buildingHeight = element.properties.levels * 8.53018
        } else {
            buildingHeight = 22
        }

        const geometry = await new THREE.ExtrudeGeometry(shape, {amount: buildingHeight, bevelEnabled: false});

        return geometry
    }

    const calculateUsefulLngLat = (longitude, lattitude) => {
        lng = lon2tile(longitude, zoomLevel);
        lat = lat2tile(lattitude, zoomLevel);
        const centerLat = tile2lat(lat + 0.5);
        const centerLng = tile2long(lng + 0.5);
        const unitLat = tile2lat(lat + 1) - tile2lat(lat);
        const unitLng = tile2long(lng + 1) - tile2long(lng);
        offsetLat = (lattitude - centerLat) * pngSize * scale2D / unitLat;
        offsetLng = (longitude - centerLng) * pngSize * scale2D / unitLng;
    }

    useEffect(() => {
        if (props.hasBackgroundMap) {
            props.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, () => {
                changeMapBackground();
            });
        }
    }, [])

    useEffect(() => {
        if (props.hasBackgroundMap && props.isLocationChanged) {
            jsonData = null;
            calculateUsefulLngLat(props.mapLocation.lng, props.mapLocation.lat)
            clearMapScene();
            clearBuildingScene();
            changeMapBackground();
            if (props.mapDimension) {
                if (!props.viewer.overlays.hasScene('buildingScene')) {
                    props.viewer.overlays.addScene('buildingScene');
                }
                meshBuildings();
            }
        }
        if (props.isLocationChanged && !props.hasBackgroundMap) {
            clearMapScene();
            clearBuildingScene();
        }
        if (props.hasBackgroundMap && !props.mapDimension) {
            clearBuildingScene();
        }
    }, [props.mapLocation, props.hasBackgroundMap, props.mapType, props.mapDimension])

    useEffect(() => {
        if (props.hasBackgroundMap) {
            if (props.hasBackgroundMap) {
                tiles.scale.set(scale2D * props.scale, scale2D * props.scale, 1);
            }
            if (props.mapDimension) {
                buildingsmesh.scale.set(props.scale, props.scale, 1);
            }
        }
    }, [props.scale])

    useEffect(() => {
        if (props.hasBackgroundMap) {
            if (props.hasBackgroundMap) {
                tiles.rotation.setFromVector3(new THREE.Vector3(0, 0, props.rotation * Math.PI / 180));
            }
            if (props.mapDimension) {
                buildingsmesh.rotation.setFromVector3(new THREE.Vector3(0, 0, props.rotation * Math.PI / 180));
            }
        }
    }, [props.rotation])


    const clearBuildingScene = () => {
        props.viewer.overlays.removeMesh(buildingsmesh, 'buildingScene');
        props.viewer.overlays.removeScene('buildingScene');
    }

    const clearMapScene = () => {
        props.viewer.overlays.removeScene('map');
    }

    const changeMapBackground = async () => {
        if (!props.viewer.overlays.hasScene('map')) {
            props.viewer.overlays.addScene('map');
        }
        boundingBoxHeight = props.viewer.model.getData().modelSpaceBBox.min.z;
        tiles = new THREE.Object3D();
        const tilex = [-1, 0, 1];
        const tiley = [-1, 0, 1];
        tilex.forEach(x => {
            tiley.forEach(y => {
                if (x === -1 && y === -1) {
                    jsonData = null;
                }
                quad(x, y)
                    .then(z => {
                        tiles.add(z);
                    })
                    .catch(error => {
                        throw error
                    })
            })
        })
        window.tiles = tiles;
        tiles.position.set(-offsetLng, offsetLat, boundingBoxHeight - 5);
        tiles.scale.set(scale2D, scale2D, 1);
        props.viewer.overlays.addMesh(tiles, 'map');
    }


    return (
        <></>
    )

}

const mapStateToProps = state => {
    const {hasBackgroundMap, mapType, mapLocation, isLocationChanged, scale, rotation, mapDimension} = state.viewer;
    return {hasBackgroundMap, mapType, mapLocation, isLocationChanged, scale, rotation, mapDimension};
}

export default connect(mapStateToProps, {})(mapContent);