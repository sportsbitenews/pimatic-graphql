#!/usr/bin/env babel-node --optional es7.asyncFunctions

import * as fs from "fs";
import * as path from "path";
import Schema from "../src/schema";
import { graphql } from "graphql";
import { introspectionQuery, printSchema } from "graphql/utilities";

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await graphql(Schema, introspectionQuery);
  if (result.errors) {
    console.error(
      "ERROR introspecting schema: ",
      JSON.stringify(result.errors, undefined, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, "../schema/schema.json"),
      JSON.stringify(result, undefined, 2)
    );
  }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, "../schema/schema.graphql"),
  printSchema(Schema)
);
