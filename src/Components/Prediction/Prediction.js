import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "../../axiosInstance";

const Prediction = props => {
  const [studentName, setStudentName] = useState("");
  const [stat, setStat] = useState("");

  useEffect(() => {
    axios
      .get(`/api/assig/stats/?student_id=${props.student}`)
      .then(res => {
        setStat(res.data.grade);
        setStudentName(res.data.student);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.student]);
  return (
    <Card title={studentName} style={{ width: 250, textAlign: "center" }}>
      <CircularProgressbar
        value={stat}
        text={`${stat}%`}
        styles={buildStyles({
          textSize: "14px",
          pathColor: "#002766",
          textColor: "#002766"
        })}
      />
    </Card>
  );
};

export default Prediction;
