import axios from "axios";
import FormData from "form-data";
import { urlConfig } from '../constants/urlConstants';

export const GET_MODEL_LIST = "@viewer/get-model-list";
export const GET_MODEL_LIST_SUCCESS = "@account/get-model-list-success";
export const GET_MODEL_LIST_FAILURE = "@account/get-model-list-failure";
export const UPLOAD_MODEL = "@account/upload-model";
export const UPLOAD_MODEL_SUCCESS = "@account/upload-model-success";
export const UPLOAD_MODEL_FAILURE = "@account/upload-model-failure";
export const DELETE_MODEL = "@account/delete-model";
export const DELETE_MODEL_SUCCESS = "@account/delete-model-success";
export const DELETE_MODEL_FAILURE = "@account/delete-model-failure";
export const RENAME_MODEL = "@account/rename";
export const RENAME_MODEL_SUCCESS = "@account/rename-success";
export const RENAME_MODEL_FAILURE = "@account/rename-failure";
export const SET_DEFAULT = "@account/set-default";
export const SET_UPLOADED_FILE_INFO = "@account/set-uploaded-file-info";


export function getModelList() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MODEL_LIST });
      await axios
        .get("/models")
        .then(async (response) => {
          await dispatch({
            type: GET_MODEL_LIST_SUCCESS,
            payload: response.data,
          });
        });
    } catch (error) {
      dispatch({
        type: GET_MODEL_LIST_FAILURE,
      });
      throw error;
    }
  };
}

export function uploadNewModel(file) {
  return async (dispatch) => {
    try {
      dispatch({ type: UPLOAD_MODEL });   
      var data = new FormData();
       data.append('file', file);

      await axios
        .post("/upload/", data)
        .then(async (response) => {
           await dispatch({
             type: UPLOAD_MODEL_SUCCESS,
             payload: response.data,
             loading: false
           });
        });
    } catch (error) {
      dispatch({
        type: UPLOAD_MODEL_FAILURE,
      });
      throw error;
    }
  };
}

export function deleteModel(uniqueId, id, index) {
  return async (dispatch) => {
    try {
      dispatch({ 
        type: DELETE_MODEL,
        payload: index
       });   
      const config = {
        method: 'post',
        url: urlConfig.url.API_DELETE_MODEL,
        headers: {
          'subid': localStorage.getItem("subId"),
          'uniqueid': uniqueId,
          'deleteid': id
        }
      }
      await axios(config)
        .then(async (response) => {
           await dispatch({
             type: DELETE_MODEL_SUCCESS,
             payload: index
           });
        });
    } catch (error) {
      dispatch({
        type: DELETE_MODEL_FAILURE,
      });
      throw error;
    }
  };
}

export function setDefault() {
  return async (dispatch) => {
    try {
      dispatch({type: SET_DEFAULT});
    }
    catch(error) {
      throw error;
    }
  }
}

export function setUploadedFileInfo(model, index) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_UPLOADED_FILE_INFO,
        payload: model,
        index: index
      });
    }
    catch(error) {
      throw error;
    }
  }
}

export function changeModelName(model, title, index) {
  return async (dispatch) => {
    try {
      dispatch({ 
        type: RENAME_MODEL
       });

      const data = JSON.stringify([{
        "ModelURN": model.ModelURN,
        "UniqueId": model.UniqueId,
        "LoadingStatus": model.LoadingStatus,
        "DeleteId": model.DeleteId,
        "DisplayName": title,
        "UserId": localStorage.getItem("subId"),
        "TempId": model.TempId,
        "Since": model.Since
      }]);

      const config = {
        method: 'put',
        url: urlConfig.url.API_RENAME_MODEL,
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data
      }
      await axios(config)
        .then(async (response) => {
           await dispatch({
             type: RENAME_MODEL_SUCCESS,
             updatingIndex: index,
             payload: title
           });
        })
        .catch(function (error) {
          dispatch({
            type: RENAME_MODEL_FAILURE,
          });
        });
    } catch (error) {
      dispatch({
        type: RENAME_MODEL_FAILURE,
      });
      throw error;
    }
  };
}
