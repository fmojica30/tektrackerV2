import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  nav_state: "",
  disabled: false
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAV_HOME:
      return {
        ...state,
        nav_state: "1"
      };
    case actionTypes.SET_NAV_NEW_ASSIGNMENT:
      return {
        ...state,
        nav_state: "4"
      };
    case actionTypes.SET_NAV_NEW_STUDENT:
      return {
        ...state,
        nav_state: "2"
      };
    case actionTypes.SET_NAV_NEW_TEACHER:
      return {
        ...state,
        nav_state: "3"
      };
    case actionTypes.DEACTIVATE_NAV:
      return {
        ...state,
        disabled: true
      };
    case actionTypes.ACTIVATE_NAV:
      return {
        ...state,
        disabled: false
      };
    default:
      return state;
  }
};

export default navReducer;
