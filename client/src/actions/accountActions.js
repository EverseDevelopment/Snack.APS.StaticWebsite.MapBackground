import axios from "axios";

export const SIGN_IN = "@account/sign-in";
export const SIGN_IN_SUCCESS = "@account/sign-in-success";
export const SIGN_IN_FAILURE = "@account/sign-in-failure";
export const SIGN_OUT = "@account/sign-out";
export const SIGN_OUT_SUCCESS = "@account/sign-out-success";
export const SIGN_OUT_FAILURE = "@account/sign-out-failure";
export const GET_SESSION = "@account/get-session";
export const GET_SESSION_SUCCESS = "@account/get-session-success";
export const GET_SESSION_FAILURE = "@account/get-session-failure";
export const GET_MODEL_LIST_SUCCESS = "@account/get-model-list-success";

export function signIn(username, password, history) {

  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_IN });

      const config = {
        method: 'post',
        url: '/pass',
        data : {user: username, pass: password}
      }

      axios(config).then(res => {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("accessToken", token);
        history.push('/dashboard');
      })
      .catch(err => {
        dispatch({
          type: SIGN_IN_FAILURE,
        });
      })
    } catch (error) {
      dispatch({
        type: SIGN_IN_FAILURE,
      });
      throw error;
    }
  };
}

export function signOut() {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_OUT });
      localStorage.clear();
      dispatch({
        type: SIGN_OUT_SUCCESS,
      });
      window.location.href = "/login";
    } catch (error) {
      dispatch({
        type: SIGN_OUT_FAILURE,
      });
      throw error;
    }
  };
}
