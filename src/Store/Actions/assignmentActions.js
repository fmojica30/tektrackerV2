import * as actionTypes from "../Actions/actionTypes";
import axios from "../../axiosInstance";

export const get_students = () => dispatch => {
  axios
    .get("/api/student")
    .then(res => {
      console.log(res.data);
      dispatch({ type: actionTypes.GET_STUDENTS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
