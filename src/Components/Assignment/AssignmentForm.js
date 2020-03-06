import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Card, Select } from "antd";
import { Icon } from "@ant-design/compatible";

import axios from "../../axiosInstance";
import * as actionTypes from "../../Store/Actions/actionTypes";

// Component Imports
import AssignmentButton from "./Display/AssignmentButton";

const AssignmentForm = props => {
  const { Option } = Select;

  const [assignmentName, setAssignmentName] = useState("");
  const [tek, setTek] = useState("g1");
  const [active, setActive] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
    const assignment = {
      group: "1",
      name: assignmentName,
      tek_choice: tek
    };
    axios
      .post("/api/assig/assignment/", assignment)
      .then(res => {
        console.log(res);
        props.setAssignment(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    props.changeToGrades();
  };

  const buttonHandler = () => {
    if (assignmentName !== "" && tek !== "") {
      setActive(true);
    } else if (assignmentName !== "" || tek !== "") {
      setActive(false);
    } else {
      setActive(false);
    }
  };

  return (
    <Row
      gutter={[8, 8]}
      type="flex"
      style={{
        alignItems: "center",
        paddingTop: "30px",
        paddingBottom: "30px"
      }}
    >
      <Col span={8}></Col>
      <Col span={8}>
        <Card title="New Assignment" bordered>
          <Form className="login-form" onSubmit={submitHandler}>
            <Input
              prefix={
                <Icon type="folder" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Assignment Name"
              style={{ marginBottom: "30px" }}
              size="large"
              value={assignmentName}
              onChange={e => {
                e.preventDefault();
                const newName = e.target.value;
                buttonHandler();
                setAssignmentName(prevAssignmentName => newName);
              }}
            />
            <Select
              style={{ width: 200 }}
              placeholder="Select a TEK Group"
              size="large"
              defaultValue="g1"
              onChange={value => {
                const newValue = value;
                buttonHandler();
                setTek(prevTekState => newValue);
              }}
            >
              <Option value="g1">Group 1</Option>
              <Option value="g2">Group 2</Option>
              <Option value="g3">Group 3</Option>
            </Select>
            <br />
            <AssignmentButton active={active} />
          </Form>
        </Card>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  assignment: state.assignment,
  assignmentForm: state.assignmentForm
});

const mapDispatchToProps = dispatch => ({
  setAssignment: data =>
    dispatch({ type: actionTypes.SET_ASSIGNMENT, payload: data }),
  changeToGrades: () => dispatch({ type: actionTypes.CHANGE_STEP_TO_GRADES }),
  changeToComplete: () =>
    dispatch({ type: actionTypes.CHANGE_STEP_TO_COMPLETE })
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentForm);
