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

  if (response.headers["set-cookie"] && response.headers) {
    context.response.set("Set-Cookie", response.headers["set-cookie"]);
  }

  return response.data;
}

export async function makeAPIAuthRequest(username, password, ctx: Context) {
  const axiosConfig: any = {
    method: "get",
    url: `http://${host}:${port}/api/config/settings/gui`,
    auth: {
      username, password
    }
  };

  try {
    const response = await axios(axiosConfig);

    if (response.headers["set-cookie"]) {
      ctx.response.set("Set-Cookie", response.headers["set-cookie"]);
    }

    ctx.response.body = { result: true };
  } catch (err) {
    ctx.response.body = { result: false };
  }
}