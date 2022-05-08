import { produce } from "immer";
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT
} from "../actions/accountActions";

const initialState = {
  user: null,
  sentEmail: null,
  changedPassword: null,
  validationsMessage: null
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return produce(state, (draft) => {
        draft.user = null;
        draft.validationsMessage = null;
      });
    }
    case SIGN_IN_SUCCESS: {
      return produce(state, (draft) => {
        draft.user = action.payload;
      });
    }
    case SIGN_IN_FAILURE: {
      return produce(state, (draft) => {
        draft.validationsMessage = action.payload;
      });
    }
    case SIGN_OUT: {
      return produce(state, (draft) => {
        draft.user = null;
        draft.validationsMessage = null;
      });
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
