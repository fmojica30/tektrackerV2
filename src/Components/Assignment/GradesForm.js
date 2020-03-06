import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, InputNumber } from "antd";

import * as assignmentActions from "../../Store/Actions/assignmentActions";
import * as actionTypes from "../../Store/Actions/actionTypes";
import { Icon } from "@ant-design/compatible";

import AssignmentButton from "./Display/AssignmentButton";
import axios from "../../axiosInstance";

const GradesForm = props => {
  const [grades, setGrades] = useState("");

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name"
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name"
    },
    {
      title: "Grade",
      dataIndex: "value",
      render: (value, row, index) => {
        return (
          <InputNumber
            id={index}
            onChange={value => changeGradeHandler(value, index)}
            min={0}
            max={100}
            defaultValue={0}
          />
        );
      },
      key: "id"
    }
  ];

  const changeGradeHandler = (value, idx) => {
    // e.preventDefault();
    const newGrade = value;
    const lookup = idx.toString();
    if (grades === "") {
      setGrades([...props.assignment.students]);
      setGrades(prevGrades => {
        const newObject = prevGrades[lookup];
        newObject.grade = newGrade;
        return {
          ...prevGrades,
          [lookup]: newObject
        };
      });
    } else {
      setGrades(prevGrades => {
        const newObject = prevGrades[lookup];
        newObject.grade = newGrade;
        return {
          ...prevGrades,
          [lookup]: newObject
        };
      });
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(grades);
    const newGrades = [];
    for (let grade in grades) {
      const newGrade = {
        student: grades[grade].id,
        group: props.assignment.assignment.group,
        assignment: props.assignment.assignment.id,
        grade: grades[grade].grade
      };
      newGrades.push(newGrade);
    }
    console.log(newGrades);
    axios
      .post("/api/assig/grade/", newGrades)
      .then(res => {
        console.log(res);
        props.changeToComplete();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    props.getStudents();
  }, []);

  return (
    <div>
      <form onSubmit={e => submitHandler(e)}>
        {props.assignment.assignment ? (
          <h1 style={{ marginTop: "15px" }}>
            Input Grades for : {props.assignment.assignment.name}
          </h1>
        ) : (
          <Icon type="loading" />
        )}
        {props.assignment.students !== [] ? (
          <Table
            dataSource={props.assignment.students}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        ) : (
          <Table dataSource={null} />
        )}
        <AssignmentButton active={true} />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  assignment: state.assignment,
  assignmentForm: state.assignmentForm
});

const mapDispatchToProps = dispatch => ({
  getStudents: () => dispatch(assignmentActions.get_students()),
  changeToComplete: () =>
    dispatch({ type: actionTypes.CHANGE_STEP_TO_COMPLETE })
});

export default connect(mapStateToProps, mapDispatchToProps)(GradesForm);
