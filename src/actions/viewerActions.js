import axios from "axios";
import { tokenUrl, apiKey } from '../constants/dummyData';

export const GET_TOKEN = "@viewer/get-token";
export const GET_TOKEN_SUCCESS = "@account/get-token-success";
export const GET_TOKEN_FAILURE = "@account/get-token-failure";
/////Viewer Hard coded data
export const SET_CATEGORY = "@viewer/set-category";
export const SET_MODEL_NODES = "@viewer/set-model-nodes";
export const SET_SELECTED_CATEGORY = "@viewewr/set-selected-category";
export const UPDATE_VENDOR_CHECK_STATUS = "@viewer/update-vendor-check-status";
export const SELECTED_TOPBAR = "SELECTED_TOPBAR";
export const SET_GEOLOCATION_MAP = "SET_GEOLOCATION_MAP";
export const SET_MAP_TYPE = "SET_MAP_TYPE";
export const SET_MAP_POSITION = "SET_MAP_POSITION";
export const SET_ROTATION_VALTUE = "SET_ROTATION_VALTUE";
export const SET_SCALE_VALUE = "SET_SCALE_VALUE";
export const SET_MAP_DIMENSION = "SET_MAP_DIMENSION";

export function placeGeolocationMap(isSet) {
  return {
    type: SET_GEOLOCATION_MAP,
    payload: isSet
  }
}

export function setMapType(mapType) {
  return {
    type: SET_MAP_TYPE,
    payload: mapType ? 1 : 0
  }
}

export function setMapPosition(position) {
  return {
    type: SET_MAP_POSITION,
    payload: position
  }
}

export function setRotationValue(number) {
  return {
    type: SET_ROTATION_VALTUE,
    payload: number
  }
}

export function setScaleValue(number) {
  return {
    type: SET_SCALE_VALUE,
    payload: number
  }
}

export function setMapDimension(data) {
  return {
    type: SET_MAP_DIMENSION,
    payload: data
  }
}

export function getToken() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_TOKEN });
      var config = {
        method: 'get',
        url: tokenUrl,
        headers: { 
          'x-api-key': apiKey
        }
      };
      
      axios(config)
      .then(async function (response) {
        await dispatch({
          type: GET_TOKEN_SUCCESS,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      dispatch({
        type: GET_TOKEN_FAILURE,
      });
      throw error;
    }
  };
}
