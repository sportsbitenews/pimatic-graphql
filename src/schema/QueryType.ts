import { GraphQLObjectType, GraphQLList } from "graphql";
import { connectionArgs, connectionFromPromisedArray } from "graphql-relay";

import DeviceType, { deviceConnection, getAllDevices } from "./DeviceType";
import GroupType, { groupConnection, getAllGroups } from "./GroupType";
import PageType, { pageConnection, getAllPages } from "./PageType";

import { nodeField } from "./nodeDefinitions";
import { makeAPIGetRequest } from "../api";

export default new GraphQLObjectType({
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
    },

    pages: {
      type: pageConnection,
      args: connectionArgs,
      resolve: (root, args, context) =>
        connectionFromPromisedArray(
          getAllPages(context), args
        )
    }
  }
});
