import axios from "axios";
import { Context } from "koa";

const host = "192.168.1.217";
const port = "8080";

export async function makeAPIGetRequest(context: Context, path: string) {
  const axiosConfig: any = {
    method: "get",
    url: `http://${host}:${port}${path}`,
    headers: {}
  };

  if (context.headers.cookie) {
    axiosConfig.headers.Cookie = context.headers.cookie;
  }

  if (context.headers.authorization) {
    axiosConfig.headers.Authorization = context.headers.authorization;
  }

  const response = await axios(axiosConfig);

  if (response.headers["set-cookie"]) {
    context.response.set("Set-Cookie", response.headers["set-cookie"]);
  }

  return response.data;
}