require("babel-polyfill");

import * as Koa from "koa";
import * as Router from "koa-router";
import * as koaBody from "koa-bodyparser";
import * as koaStatic from "koa-static";
import * as adapt from "koa-adapter";
import * as axios from "axios";
import { graphqlKoa } from "graphql-server-koa";
import * as webpackConfig from "./client/config/webpack.config";

import { makeAPIAuthRequest } from "./api";
import schema from "./schema";

const app = new Koa();
const router = new Router();

app.use(koaBody());

const graphqlConfig = (ctx) => ({
  schema,
  context: ctx
});

if (process.env.NODE_ENV !== "production") {
  const WebpackDevServer = require("webpack-dev-server");
  const Webpack = require("webpack");
  const koaWebpack = require("koa-webpack");

  const compiler = Webpack(webpackConfig);

  // const middleware = koaWebpack({
  //   compiler
  // });

  // app.use(middleware);


  const webpackDevServer = new WebpackDevServer(
    compiler, webpackConfig.devServer
  );

  webpackDevServer.listen(8080, "localhost", function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log("webpack-dev-server listening at http://localhost:8080");
  });
}

router.post("/graphql", graphqlKoa(context => ({ schema, context })));
router.get("/graphql", graphqlKoa(context => ({ schema, context })));

router.post("/auth-login", async (ctx) => {
  const { username, password } = ctx.request.body;
  await makeAPIAuthRequest(username, password, ctx);
});

app.use(router.routes());

app.use(koaStatic("public", { defer: true }));

const PORT = process.env.NODE_ENV !== "production" ? 3000 : 8080;
app.listen(PORT);