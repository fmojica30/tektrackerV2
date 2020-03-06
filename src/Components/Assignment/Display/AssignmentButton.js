import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

const AssignmentButton = props => {
  return (
    <Fragment>
      {props.assignmentForm.currentStep === "assignment" ||
      props.assignmentForm.currentStep === "grades" ? (
        <Button
          type="primary"
          className="login-form-button"
          size="large"
          htmlType="submit"
          style={{ marginTop: "25px" }}
          disabled={!props.active}
        >
          Continue
        </Button>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  assignmentForm: state.assignmentForm
});

export default connect(mapStateToProps)(AssignmentButton);
