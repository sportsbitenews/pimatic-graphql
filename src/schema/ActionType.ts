import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLUnionType, GraphQLInt } from "graphql";
import { GraphQLDateTime } from "graphql-custom-types";
import * as GraphQLJSON from "graphql-type-json";

const ActionType = new GraphQLObjectType({
  name: "Action",
  description: "An available action on a Pimatic Device",
  fields: () => ({
    description: { type: GraphQLString },
    name: { type: GraphQLString },
    params: { type: GraphQLJSON },
    returns: { type: GraphQLJSON }
  })
});

export default ActionType;