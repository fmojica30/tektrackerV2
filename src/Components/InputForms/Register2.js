import React from "react";
import { connect } from "react-redux";
import { Form, Input, Tooltip, Button } from "antd";

import * as actions from "../../Store/Actions/authActions";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const RegistrationForm = props => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log("Received values of form: ", values);
    props.onAuth(
      values.username,
      values.email,
      values.password,
      values.confirm
    );
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="Username"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="Please input a Username"></Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please input your Username!",
            whitespace: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
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
  onAuth: (username, email, password1, password2) =>
    dispatch(actions.authSignup(username, email, password1, password2))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
