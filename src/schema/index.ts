import { GraphQLSchema, GraphQLObjectType } from "graphql";

import QueryType from "./QueryType";

const schema = new GraphQLSchema({
  query: QueryType
});

export default schema;