import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { __RouterContext } from "react-router";

import * as actions from "../../Store/Actions/authActions";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
};

const LoginForm = props => {
  const onFinish = values => {
    console.log("Success:", values);
    props.onAuth(values.username, values.password);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onAuth: (username, password) =>
    dispatch(actions.authLogin(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
