import React from "react";
import { connect } from "react-redux";

//Redux imports
import * as assignmentActions from "../../../Store/Actions/assignmentActions";
import * as actionTypes from "../../../Store/Actions/actionTypes";

// Component Imports
import AssignmentSteps from "./AssignmentSteps";
import AssignmentForm from "../AssignmentForm";
import GradesForm from "../GradesForm";
import CompleteForm from "../CompleteForm";

const AssignmentWrapper = props => {
  let current = null;

  if (props.assignmentForm.currentStep === "assignment") {
    current = <AssignmentForm />;
  } else if (props.assignmentForm.currentStep === "grades") {
    current = <GradesForm />;
  } else {
    current = <CompleteForm />;
  }

  return (
    <div>
      <AssignmentSteps steps={props.assignmentForm.steps} />
      {current}
    </div>
  );
};

const mapStateToProps = state => ({
  assignment: state.assignment,
  assignmentForm: state.assignmentForm
});

const mapDispatchToProps = dispatch => ({
  getStudents: () => assignmentActions.get_students(),
  changeToGrades: () => dispatch({ type: actionTypes.CHANGE_STEP_TO_GRADES }),
  changeToComplete: () =>
    dispatch({ type: actionTypes.CHANGE_STEP_TO_COMPLETE })
});
export default connect(mapStateToProps, mapDispatchToProps)(AssignmentWrapper);
