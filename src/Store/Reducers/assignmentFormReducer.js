import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  steps: {
    assignment: "process",
    grades: "wait",
    complete: "wait"
  },
  currentStep: "assignment"
};

const assignmentFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_STEP_TO_COMPLETE:
      return {
        steps: {
          ...state.steps,
          grades: "finish",
          complete: "process"
        },
        currentStep: "complete"
      };
    case actionTypes.CHANGE_STEP_TO_GRADES:
      return {
        steps: {
          ...state.steps,
          assignment: "finish",
          grades: "process"
        },
        currentStep: "grades"
      };
    case actionTypes.RESET_FORM_STATE:
      return {
        steps: {
          assignment: "process",
          grades: "wait",
          complete: "wait"
        },
        currentStep: "assignment"
      };
    default:
      return state;
  }
};

export default assignmentFormReducer;
