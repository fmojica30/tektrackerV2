import React from "react";
import { Steps } from "antd";
import { Icon } from "@ant-design/compatible";

const { Step } = Steps;

const AssignmentSteps = props => {
  return (
    <Steps>
      <Step
        status={props.steps.assignment}
        title="Assignment"
        icon={
          props.steps.assignment !== "finish" ? (
            <Icon type="folder-open" />
          ) : (
            <Icon type="folder" theme="filled" />
          )
        }
      />
      <Step
        status={props.steps.grades}
        title="Grades"
        icon={
          props.steps.grades !== "finish" ? (
            <Icon type="file" />
          ) : (
            <Icon type="file" theme="filled" />
          )
        }
      />
      <Step
        status={props.steps.complete}
        title="Complete"
        icon={
          props.steps.complete !== "finish" ? (
            <Icon type="folder" />
          ) : (
            <Icon type="folder" theme="filled" />
          )
        }
      />
    </Steps>
  );
};

export default AssignmentSteps;
