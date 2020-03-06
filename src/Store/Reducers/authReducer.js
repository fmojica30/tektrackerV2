import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        error: null,
        loading: false,
        token: action.token
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;
