import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { connect } from "react-redux";

import Wrapper from "./Components/Layout/Wrapper";
import NewStudentForm from "./Components/InputForms/NewStudentForm";
import NewTeacherForm from "./Components/InputForms/NewTeacherForm";
import AssignmentWrapper from "./Components/Assignment/Display/AssignmentWrapper";
import PredictionsLayout from "./Components/Prediction/PredictionsLayout";
import Login from "./Components/InputForms/Login";
import Register from "./Components/InputForms/Register";
import * as authActions from "./Store/Actions/authActions";

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  return (
    <Router>
      <div className="App">
        <Wrapper {...props}>
          {props.isAuthenticated ? (
            <Switch>
              <Route path="/new_assignment" component={AssignmentWrapper} />
              <Route path="/new_teacher" component={NewTeacherForm} />
              <Route path="/new_student" component={NewStudentForm} />
              <Route path="/class_stats" component={PredictionsLayout} />
              <Route path="/" render={() => <h1>Test</h1>} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/" exact component={Login} />
            </Switch>
          )}
        </Wrapper>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(authActions.authCheckState)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
