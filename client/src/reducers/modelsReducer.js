import { produce } from "immer";
import {
  GET_MODEL_LIST,
  GET_MODEL_LIST_SUCCESS,
  GET_MODEL_LIST_FAILURE,
  UPLOAD_MODEL,
  UPLOAD_MODEL_SUCCESS,
  UPLOAD_MODEL_FAILURE,
  DELETE_MODEL,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE,
  RENAME_MODEL,
  RENAME_MODEL_SUCCESS,
  RENAME_MODEL_FAILURE,
  SET_DEFAULT,
  SET_UPLOADED_FILE_INFO
} from "../actions/modelsActions";

const initialState = {
  modelList: null,
  uploading: false,
  uploadingResult: 0,
  deleting: false,
  deletingStatus: 0,
  deletingIndex: -1,
  isRename: false,
  reNameResult: 0,
  isModelList: 0
};

const modelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT: {
      return produce(state, (draft) => {
        // draft.isRename = false;
        // draft.reNameResult = 0;
        draft.uploadingResult = 0
      })
    }
    case SET_UPLOADED_FILE_INFO: {
      return produce(state, (draft) => {
        draft.modelList[action.index] = action.payload
      })
    }
    case GET_MODEL_LIST: {
      return produce(state, (draft) => {
        draft.modelList = null;
        draft.isModelList = 0;
      });
    }
    case GET_MODEL_LIST_SUCCESS: {
      return produce(state, (draft) => {
        draft.modelList = action.payload.models;
        draft.isModelList = 1;
      });
    }
    case GET_MODEL_LIST_FAILURE: {
      return produce(state, (draft) => {
        draft.isModelList = 2;
      });
    }
    case UPLOAD_MODEL: {
      return produce(state, (draft) => {
        draft.uploading = true;
        draft.uploadingResult = 0;
      });
    }
    case UPLOAD_MODEL_SUCCESS: {
      return produce(state, (draft) => {
        const modelListCopy = [
          ...draft.modelList,
          action.payload,
        ];
        draft.modelList = modelListCopy;
        draft.uploading = false;
        draft.uploadingResult = 1;
      });
    }
    case UPLOAD_MODEL_FAILURE: {
      return produce(state, (draft) => {
        draft.uploading = false;
        draft.uploadingResult = 2;
        // Error
      });
    }
    case DELETE_MODEL: {
      return produce(state, (draft) => {
        draft.deleting = true;
        draft.deletingStatus = 0;
        draft.deletingIndex = action.payload;
      })
    }
    case DELETE_MODEL_SUCCESS: {
      return produce(state, (draft) => {
        let models = draft.modelList;
        models.splice(action.payload, 1);
        draft.modelList = models;
        draft.deleting = false;
        draft.deletingStatus = 1;
        draft.deletingIndex = -1;
      });
    }
    case DELETE_MODEL_FAILURE: {
      return produce(state, (draft) => {
        draft.deleting = false;
        draft.deletingStatus = 2;
        draft.deletingIndex = -1;
      })
    }
    case RENAME_MODEL: {
      return produce(state, (draft) => {
        draft.isRename = true;
        draft.reNameResult = 0;
      })
    }
    case RENAME_MODEL_SUCCESS: {
      return produce(state, (draft) => {
          draft.isRename = false;
          draft.reNameResult = 1;
          draft.modelList[action.updatingIndex].DisplayName = action.payload;
        }
      )
    }
    case RENAME_MODEL_FAILURE: {
      return produce(state, (draft) => {
          draft.isRename = false;
          draft.reNameResult = 2;
        }
      )
    }
    default: {
      return state;
    }
  }
};

export default modelReducer;
