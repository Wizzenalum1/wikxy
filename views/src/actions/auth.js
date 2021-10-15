import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from "./actionTypes";
import { getFormBody } from "../helpers/utils";
import { APIUrls } from "../helpers/urls";

//***************   action creator for LOGIN process **************** */
//psedo action type
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          localStorage.setItem("wikxy-token", data.token);
          dispatch(loginSuccess(data.user));
        } else {
          dispatch(loginFailed(data.message));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
}

// actual actions
export const startLogin = function () {
  return {
    type: LOGIN_START,
  };
};
export const loginSuccess = function (user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
};

export const loginFailed = function (error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
};

//***************   action creator for SIGNUP process **************** */
// signup is similar to sign up even get the user authentication token as it created
export function signup(formData) {
  return (dispatch) => {
    dispatch(startSignup());
    const url = APIUrls.signup();
    fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          localStorage.setItem("wikxy-token", data.token);
          dispatch(signupSuccess(data.user));
        } else {
          dispatch(signupFailed(data.message));
        }
      })
      .catch((error) => {
        dispatch(signupFailed(error));
      });
  };
}

export const startSignup = function () {
  return {
    type: SIGNUP_START,
  };
};

export const signupSuccess = function (user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
};

export const signupFailed = function (error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
};

//* ******************************* OTHERS
// this will authenticate as soon as he open the brouser and user is alredy login
export const authenticateUser = function (user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
};
export const logOut = function () {
  return {
    type: LOG_OUT,
  };
};

// to change the auth.error to null as i changed the page
export const clearAuthState = function () {
  return {
    type: CLEAR_AUTH_STATE,
  };
};
