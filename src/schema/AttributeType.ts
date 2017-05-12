import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLUnionType, GraphQLInt } from "graphql";
import { GraphQLDateTime } from "graphql-custom-types";

const HistoryType = new GraphQLObjectType({
  name: "History",
  description: "History entry of a device attribute",
  fields: () => ({
    t: { type: GraphQLDateTime },
    v: {
      type: GraphQLString,
      resolve: ({v}) => JSON.stringify(v)
    }
  })
});

const AttributeType = new GraphQLObjectType({
  name: "Attribute",
  description: "Attribute of a Pimatic device",
  fields: () => ({
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    labels: { type: new GraphQLList(GraphQLString) },
    label: { type: GraphQLString },
    discrete: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    value: {
      type: GraphQLString,
      resolve: ({value}) => JSON.stringify(value)
    },
    history: { type: new GraphQLList(HistoryType) },
    lastUpdate: { type: GraphQLDateTime }
  })
});

export default AttributeType;