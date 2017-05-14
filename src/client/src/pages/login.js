import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Box from "grommet/components/Box";
import App from "grommet/components/App";
import LoginForm from "grommet/components/LoginForm";
import Toast from "grommet/components/Toast";

import { authenticate } from "../auth";

export default class Login extends Component {
  state = {
    redirectToReferrer: false,
    loginFailed: false,
  };

  login = async ({ username, password }) => {
    try {
      const result = await authenticate(username, password);
      if (result) {
        this.setState({ redirectToReferrer: true });
      } else {
        this.setState({ loginFailed: true });
      }
    } catch (err) {
      console.error(err);
      this.setState({ loginFailed: true });
    }
  };

  handleToastClose = () => {
    this.setState({ loginFailed: false });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer, loginFailed } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <App>
        {loginFailed
          ? <Toast status="critical" onClose={this.handleToastClose}>
              Invalid Username/Password
            </Toast>
          : null}
        <Box colorIndex="light-2" full justify="center" align="center">
          <LoginForm
            title="pimatic"
            usernameType="text"
            onSubmit={this.login}
          />
        </Box>
      </App>
    );
  }
}
