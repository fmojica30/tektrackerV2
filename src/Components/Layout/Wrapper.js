import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { connect } from "react-redux";

import * as actionTypes from "../../Store/Actions/actionTypes";
import * as authActions from "../../Store/Actions/authActions";

const { Header, Content, Footer } = Layout;

const Wrapper = props => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />

        {props.isAuthenticated ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[props.nav.nav_state]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item
              key="1"
              onClick={() => {
                props.setHome();
              }}
              disabled={props.nav.disabled}
            >
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                props.setStudent();
              }}
              disabled={props.nav.disabled}
            >
              <Link to="/new_student">New Student</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                props.setTeacher();
              }}
              disabled={props.nav.disabled}
            >
              <Link to="/new_teacher">New Teacher</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => {
                props.setAssignment();
              }}
              disabled={props.nav.disabled}
            >
              <Link to="/new_assignment">New Assignment</Link>
            </Menu.Item>
            <Menu.Item key="5" disabled={props.nav.disabled}>
              <Link to="/class_stats">Class Statistics</Link>
            </Menu.Item>
            <Menu.Item
              key="6"
              disabled={props.nav.disabled}
              onClick={props.logout}
            >
              <Link to="/">Logout</Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[props.nav.nav_state]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1" disabled={props.nav.disabled}>
              Log In
            </Menu.Item>
          </Menu>
        )}
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>TekTrakker π</Footer>
    </Layout>
  );
};

const mapStateToProps = state => ({
  nav: state.nav,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  setHome: () => dispatch({ type: actionTypes.SET_NAV_HOME }),
  setStudent: () => dispatch({ type: actionTypes.SET_NAV_NEW_STUDENT }),
  setTeacher: () => dispatch({ type: actionTypes.SET_NAV_NEW_TEACHER }),
  setAssignment: () => dispatch({ type: actionTypes.SET_NAV_NEW_ASSIGNMENT }),
  logout: () => dispatch(authActions.logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
