import { produce } from "immer";
import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  SET_CATEGORY,
  SET_MODEL_NODES,
  UPDATE_VENDOR_CHECK_STATUS,
  SET_SELECTED_CATEGORY,
  SELECTED_TOPBAR,
  SET_GEOLOCATION_MAP,
  SET_MAP_TYPE,
  SET_MAP_POSITION,
  SET_ROTATION_VALTUE,
  SET_SCALE_VALUE,
  SET_MAP_DIMENSION
} from "../actions/viewerActions";

import { 
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7,
  category8,
  category9,
  category10,
  category11,
  category12,
  category13,
  category14
} from '../constants/vendorConstants';

const initialState = {
    viewerAuth: null,
    hasBackgroundMap: false,
    mapType: 0,
    mapLocation: {lat: 52.52, lng: 13.4},
    isLocationChanged: false,
    variant: 0,
    total: 0,
    vendorList: null,
    nodeList: null,
    topBar: -1,
    vendorSelectedStatus: [
      {name: "Brivo", price: 220},
      {name: "View", price: 190},
      {name: "Prescriptive Data", price: 80},
      {
        name: "Younity",
        price: 210
      },
      {
        name: "Ligowave",
        price: 80
      },
      {
        name: "Latch",
        price: 350
      },
      {
        name: "Brivo",
        price: 410
      },
      {
        name: "Infsoft",
        price: 250
      },
      {
        name: "Infsoft",
        price: 140
      },
      {
        name: "Senstar",
        price: 160
      },
      {
        name: "Ring",
        price: 210
      },
      {
        name: "Ring",
        price: 240
      },
      {
        name: "Soloinsight",
        price: 320
      },
      {
        name: "Ring",
        price: 140
      },
    ],
    selectedCategory: null,
    scale: 1,
    rotation: 0,
    mapDimension: false
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
    case SET_CATEGORY: {
      let categoryList = setCategoryList(action.payload.variant);
      return produce(state, (draft) => {
        draft.variant = action.payload.variant;
        draft.total = action.payload.total;
        draft.vendorList = categoryList;
      })
    }
    case SET_MODEL_NODES: {
      return produce(state, (draft) => {
        draft.nodeList = action.payload
      })
    }
    case SET_SELECTED_CATEGORY: {
      return produce(state, (draft) => {
        draft.selectedCategory = action.payload
      })
    }
    case UPDATE_VENDOR_CHECK_STATUS: {
      return produce(state, (draft) => {
        draft.vendorSelectedStatus[action.index] = action.payload;
      })
    }
    case SELECTED_TOPBAR: {
      return produce(state, (draft) => {
        draft.topBar = action.payload;
      })
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

const setCategoryList = (index) => {
  let categoryList = null;
  switch (index) {
    case 1: {
      categoryList = category1;
      return categoryList;
    }
    case 2: {
      categoryList = category2;
      return categoryList;
    }
    case 3: {
      categoryList = category3;
      return categoryList;
    }
    case 4: {
      categoryList = category4;
      return categoryList;
    }
    case 5: {
      categoryList = category5;
      return categoryList;
    }
    case 6: {
      categoryList = category6;
      return categoryList;
    }
    case 7: {
      categoryList = category7;
      return categoryList;
    }
    case 8: {
      categoryList = category8;
      return categoryList;
    }
    case 9: {
      categoryList = category9;
      return categoryList;
    }
    case 10: {
      categoryList = category10;
      return categoryList;
    }
    case 11: {
      categoryList = category11;
      return categoryList;
    }
    case 12: {
      categoryList = category12;
      return categoryList;
    }
    case 13: {
      categoryList = category13;
      return categoryList;
    }
    case 14: {
      categoryList = category14;
      return categoryList;
    }
    default: {
      break;
    }
  }
}

export default viewerReducer;
