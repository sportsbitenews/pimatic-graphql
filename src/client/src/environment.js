import { Environment, Network, RecordSource, Store } from "relay-runtime";
import axios from "axios";
import { getAuth } from "./auth";

async function fetchQuery(operation, variables, cacheConfig, uploadables) {
  const authData = getAuth();

  const result = await axios({
    url: "/graphql",
    method: "post",
    auth: authData,
    data: {
      query: operation.text, // GraphQL text from input
      variables,
    },
  });

  return result.data;
}

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchQuery);
const handlerProvider = null;

export default new Environment({
  handlerProvider,
  network,
  store,
});
