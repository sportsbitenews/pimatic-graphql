import { nodeDefinitions, fromGlobalId } from "graphql-relay";

import {idFetcher, typeResolver} from "./nodeRegistry";

export const { nodeInterface, nodeField } = nodeDefinitions(
  idFetcher, typeResolver
);