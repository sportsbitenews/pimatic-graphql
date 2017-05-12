import { fromGlobalId } from "graphql-relay";

const types = {};
const getItems = {};

export function registerType(type, getItem) {
  types[type.name] = type;
  getItems[type] = getItem;

  return type;
}

export async function idFetcher(globalId, context) {
  const { type, id } = fromGlobalId(globalId);
  const getItem = getItems[type];
  const item = await getItem(id, context);
  return { __type: type, ...item };
}

export function typeResolver(obj) {
  return types[obj.__type];
}