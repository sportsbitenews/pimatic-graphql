import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { globalIdField, connectionDefinitions } from "graphql-relay";
import * as GraphQLJSON from "graphql-type-json";

import AttributeType from "./AttributeType";
import ActionType from "./ActionType";

import { makeAPIGetRequest } from "../api";
import { nodeInterface } from "./nodeDefinitions";
import { registerType } from "./nodeRegistry";

const DeviceConfigType = new GraphQLObjectType({
  name: "DeviceConfig",
  description: "Pimatic Device configuration",
  fields: () => ({
    class: { type: GraphQLString },
    name: { type: GraphQLString },
    id: { type: GraphQLString },
    deviceConfig: {
      type: GraphQLJSON,
      resolve: ({class: _, name, id, ...rest}) => rest
    }
  })
});

const DeviceType = new GraphQLObjectType({
  name: "Device",
  description: "A Pimatic Device",
  fields: () => ({
    id: globalIdField("Device"),
    deviceId: {
      type: GraphQLString,
      resolve: ({id}) => id
    },
    name: { type: GraphQLString },
    template: { type: GraphQLString },
    attributes: { type: new GraphQLList(AttributeType) },
    actions: { type: new GraphQLList(ActionType) },
    config: { type: DeviceConfigType },
    configDefaults: { type: GraphQLJSON }
  }),
  interfaces: [nodeInterface]
});

export async function getDeviceById(id, context) {
  const res = await makeAPIGetRequest(context, `/api/devices/${id}`);
  return res.device;
}

export async function getAllDevices(context) {
  const res = await makeAPIGetRequest(context, "/api/devices");
  return res.devices;
}

export const { connectionType: deviceConnection } = connectionDefinitions({
  name: "Device",
  nodeType: DeviceType
});

export default registerType(DeviceType, getDeviceById);