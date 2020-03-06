import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "antd";

import * as actionTypes from "../../Store/Actions/actionTypes";

const CompleteForm = props => {
  useEffect(() => {
    props.deactivateNav();
  }, [props]);

  return (
    <div>
      <h1>Thank you for completing grades!</h1>
      <Button
        type="primary"
        className="login-form-button"
        size="large"
        htmlType="submit"
        style={{ marginTop: "25px" }}
        onClick={() => {
          props.activateNav();
          props.setNavAssignment();
          props.resetAssignmentForm();
          props.resetAssignment();
        }}
      >
        <Link to="/new_assignment">Another Assignment</Link>
      </Button>
      <Button
        type="primary"
        className="login-form-button"
        size="large"
        htmlType="submit"
        style={{ marginTop: "25px", marginLeft: "30px" }}
        onClick={() => {
          props.activateNav();
          props.setNavHome();
          props.resetAssignmentForm();
          props.resetAssignment();
        }}
      >
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  resetAssignmentForm: () => dispatch({ type: actionTypes.RESET_FORM_STATE }),
  resetAssignment: () => dispatch({ type: actionTypes.RESET_ASSIGNMENT_STATE }),
  deactivateNav: () => dispatch({ type: actionTypes.DEACTIVATE_NAV }),
  activateNav: () => dispatch({ type: actionTypes.ACTIVATE_NAV }),
  setNavAssignment: () =>
    dispatch({ type: actionTypes.SET_NAV_NEW_ASSIGNMENT }),
  setNavHome: () => dispatch({ type: actionTypes.SET_NAV_HOME })
});

export default connect(null, mapDispatchToProps)(CompleteForm);
