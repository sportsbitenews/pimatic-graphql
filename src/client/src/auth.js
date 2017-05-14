import React, { Component } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";

const authInfo = {
  isAuthenticated: false,
  username: undefined,
  password: undefined,
};

export function getAuth() {
  return {
    username: authInfo.username,
    password: authInfo.password,
  };
}

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authInfo.isAuthenticated
          ? <Component {...props} />
          : <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />}
    />
  );
}

export async function authenticate(username, password) {
  const response = await axios({
    url: "/auth-login",
    method: "post",
    data: { username, password },
  });

  if (response.data.result) {
    authInfo.username = username;
    authInfo.password = password;
    authInfo.isAuthenticated = true;
  }

  return response.data.result;
}
