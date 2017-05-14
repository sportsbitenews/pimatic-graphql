import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { globalIdField, connectionDefinitions, connectionArgs, connectionFromPromisedArray } from "graphql-relay";
import * as GraphQLJSON from "graphql-type-json";
import { Context } from "koa";

import { makeAPIGetRequest } from "../api";
import { nodeInterface } from "./nodeDefinitions";
import { registerType } from "./nodeRegistry";

import { deviceConnection, getDeviceById } from "./DeviceType";

const PageType = new GraphQLObjectType({
  name: "Page",
  description: "Page of Favorite Devices",
  fields: () => ({
    id: globalIdField("Page"),
    pageId: {
      type: GraphQLString,
      resolve: ({ id }) => id
    },
    name: { type: GraphQLString },
    devices: {
      type: deviceConnection,
      args: connectionArgs,
      resolve: ({ devices }, args, context) =>
        connectionFromPromisedArray(
          Promise.all(
            devices.map(({ deviceId }) =>
              getDeviceById(deviceId, context))
          ),
          args
        )
    }
  }),
  interfaces: [nodeInterface]
});

export async function getAllPages(context) {
  const res = await makeAPIGetRequest(context, "/api/pages");
  return res.pages;
}

export async function getPageById(id: string, context: Context) {
  const res = await makeAPIGetRequest(context, `/api/pages/${id}`);
  return res.page;
}

export const { connectionType: pageConnection } = connectionDefinitions({
  name: "Page",
  nodeType: PageType
});

export default registerType(PageType, getPageById);
