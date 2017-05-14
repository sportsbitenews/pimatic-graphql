import "grommet/scss/hpe/index";
import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import Main from "./app";

const rootEl = document.getElementById("root");
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );

render(Main);

if (module.hot) module.hot.accept();
