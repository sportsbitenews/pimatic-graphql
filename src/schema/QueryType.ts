import { GraphQLObjectType, GraphQLList } from "graphql";
import { connectionArgs, connectionFromPromisedArray } from "graphql-relay";

import DeviceType, { deviceConnection, getAllDevices } from "./DeviceType";
import GroupType, { groupConnection, getAllGroups } from "./GroupType";

import { nodeField } from "./nodeDefinitions";
import { makeAPIGetRequest } from "../api";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all....queries",
  fields: {
    node: nodeField,

    devices: {
      type: deviceConnection,
      args: connectionArgs,
      resolve: (root, args, context) =>
        connectionFromPromisedArray(
          getAllDevices(context), args
        )
    },

    groups: {
      type: groupConnection,
      args: connectionArgs,
      resolve: (root, args, context) =>
        connectionFromPromisedArray(
          getAllGroups(context), args
        )
    }
  }
});

export default QueryType;

