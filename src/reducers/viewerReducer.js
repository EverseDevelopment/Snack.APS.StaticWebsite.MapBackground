import { produce } from "immer";
import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  SET_GEOLOCATION_MAP,
  SET_MAP_TYPE,
  SET_MAP_POSITION,
  SET_ROTATION_VALTUE,
  SET_SCALE_VALUE,
  SET_MAP_DIMENSION
} from "../actions/viewerActions";

const initialState = {
    viewerAuth: null,
    hasBackgroundMap: true,
    mapType: 0,
    mapLocation: {lat: 25.76006433447789, lng: -80.19442552645981},
    isLocationChanged: false,
    variant: 0,
    total: 0,
    vendorList: null,
    nodeList: null,
    topBar: -1,
    selectedCategory: null,
    scale: 1,
    rotation: 0,
    mapDimension: true
};

const viewerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN: {
      return produce(state, (draft) => {
        draft.viewerAuth = null;
      });
    }
    case SET_ROTATION_VALTUE: {
      return produce(state, (draft) => {
        draft.rotation = action.payload;
      })
    }
    case SET_SCALE_VALUE: {
      return produce(state, (draft) => {
        draft.scale = action.payload;
      })
    }
    case GET_TOKEN_SUCCESS: {
      return produce(state, (draft) => {
        draft.viewerAuth = action.payload;
      });
    }
    case GET_TOKEN_FAILURE: {
      return produce(state, (draft) => {
        // Error
      });
    }
    case SET_GEOLOCATION_MAP: {
      return produce(state, (draft) => {
        draft.hasBackgroundMap = action.payload;
        draft.isLocationChanged = true;
      })
    }
    case SET_MAP_TYPE: {
      return produce(state, (draft) => {
        draft.mapType = action.payload
      })
    }
    case SET_MAP_POSITION: {
      return produce(state, (draft) => {
        draft.mapLocation = action.payload;
        draft.isLocationChanged = true;
      })
    }
    case SET_MAP_DIMENSION: {
      return produce(state, (draft) => {
        draft.mapDimension = action.payload
      })
    }
    default: {
      return state;
    }
  }
};

export default viewerReducer;
