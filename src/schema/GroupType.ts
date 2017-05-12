import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { globalIdField, connectionDefinitions, connectionArgs, connectionFromPromisedArray } from "graphql-relay";
import * as GraphQLJSON from "graphql-type-json";
import { Context } from "koa";

import { makeAPIGetRequest } from "../api";
import { nodeInterface } from "./nodeDefinitions";
import { registerType } from "./nodeRegistry";

import { deviceConnection, getDeviceById } from "./DeviceType";

const GroupType = new GraphQLObjectType({
  name: "Group",
  description: "Group of devices/rules/variables",
  fields: () => ({
    id: globalIdField("Group"),
    groupId: {
      type: GraphQLString,
      resolve: ({id}) => id,
    },
    name: { type: GraphQLString },
    devices: {
      type: deviceConnection,
      args: connectionArgs,
      resolve: ({ devices }, args, context) =>
        connectionFromPromisedArray(
          Promise.all(devices.map(deviceId => getDeviceById(deviceId, context))),
          args
        )
    }
  }),
  interfaces: [nodeInterface]
});

export async function getAllGroups(context) {
  const res = await makeAPIGetRequest(context, "/api/groups");
  return res.groups;
}

export async function getGroupById(id: string, context: Context) {
  // HACK
  const allGroups = await getAllGroups(context);
  const groupMap = allGroups.reduce((prev, cur) => ({
    ...prev,
    [cur.id]: cur
  }), {});
  return groupMap[id];
}

export const { connectionType: groupConnection } = connectionDefinitions({
  name: "Group",
  nodeType: GroupType
});

export default registerType(GroupType, getGroupById);