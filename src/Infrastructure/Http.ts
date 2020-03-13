import request from "request-promise";
import Promise from "bluebird";
import { IHttp } from "./IHttp";
import { HttpRequest } from "./HttpRequest";
import { HttpErrorResponse } from "./HttpErrorResponse";
import _ from "lodash";

export const GET = "get";
//TODO crear un objeto que represente una repuesta vacia.
export default class Http implements IHttp {
  request(options: HttpRequest): Promise<object> {
    return request({
      url: options.url,
      method: options.method,
      headers: options.headers,
      json: true,
    })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(e => {
        console.error(e);
        let status = _.get(e, "statusCode");
        throw new HttpErrorResponse(status, e).get();
      });
  }
}
