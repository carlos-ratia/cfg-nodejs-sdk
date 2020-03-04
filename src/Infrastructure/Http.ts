import request from "request-promise";
import { Headers } from "request";
import { Url } from "url";
import Promise from "bluebird";

export const GET = "get";

export interface HttpRequest {
  url: string | Url;
  method: string;
  headers?: Headers;
}

export interface IHttp {
  request(options: HttpRequest): Promise<object | object[]>;
}

//TODO crear un objeto que represente una repuesta vacia.
export default class Http implements IHttp {
  request(options: HttpRequest): Promise<object | object[]> {
    return request({
      url: options.url,
      method: options.method,
      headers: options.headers,
      json: true,
    })
      .then(response => {
        return response;
      })
      .catch(e => {
        console.error(e);
        throw e;
      });
  }
}
