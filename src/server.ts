import * as Koa from "koa";
import * as Router from "koa-router";
import * as koaBody from "koa-bodyparser";
import { graphqlKoa } from "graphql-server-koa";

import schema from "./schema";

const app = new Koa();
const router = new Router();
const PORT = 3000;

app.use(koaBody());

const graphqlConfig = (ctx) => ({
  schema,
  context: ctx
});

router.post("/graphql", graphqlKoa(context => ({ schema, context })));
router.get("/graphql", graphqlKoa(context => ({ schema, context })));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);