import Http from "../Infrastructure/Http";
import _ from "lodash";
import { IApiRequest } from "./IApiRequest";
import { IApiResponse } from "./IApiResponse";
import { IHttp } from "../Infrastructure/IHttp";

export default class Api {
  protected readonly _adapter: IHttp;
  protected readonly _domain: string = "";

  get adapter(): IHttp {
    return this._adapter;
  }

  get domain(): string {
    return this._domain;
  }

  protected constructor(adapter?: IHttp) {
    if (!_.isUndefined(adapter)) {
      this._adapter = new Http();
    } else {
      this._adapter = (adapter as unknown) as IHttp;
    }
  }

  request(options: IApiRequest): Promise<IApiResponse> {
    return this.adapter
      .request({
        url: this.getUrl(options.path, options.params),
        method: options.method,
      })
      .then(response => {
        return {
          statusCode: this.getStatusCodeFromResponse(response),
          data: this.getDataCodeFromResponse(response),
          debug: this.getDebugFromResponse(response),
          error: this.getErrorFromResponse(response),
        };
      });
  }

  protected getUrl(path: string | string[], params: Object): string {
    if (_.isString(path) && !_.isArray(path)) {
      path = [path];
    }
    const urlBase: string = [this.domain, ...path].join("/");
    const urlParams: string = _.keys(params)
      .map(key => {
        let param = _.get(params, key);
        if (_.isObject(param)) {
          param = param ? JSON.stringify(param) : "";
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(param)}`;
      })
      .join("&");

    return _.isArray(urlParams) && urlParams.length > 0
      ? urlBase + "?" + urlParams
      : urlBase;
  }

  private getStatusCodeFromResponse(response: object) {
    let status: string =
      _.has(response, "statusCode") &&
      _.isInteger(_.get(response, "statusCode"))
        ? _.get(response, "statusCode")
        : 0;
    return status;
  }

  private getDataCodeFromResponse(response: object): Object[] {
    if (!_.has(response, "data")) {
      return [];
    }
    const data = _.get(response, "data");
    if (_.isArray(data)) {
      return data;
    } else if (_.isObject(data)) {
      return [data];
    } else {
      return [];
    }
  }

  private getDebugFromResponse(response: object): Object[] {
    let debug: Object[] =
      _.has(response, "debug") && _.isObject(_.get(response, "debug"))
        ? _.get(response, "debug")
        : 0;
    return debug;
  }

  private getErrorFromResponse(response: object) {
    let error: object =
      _.has(response, "error") && _.isObject(_.get(response, "error"))
        ? _.get(response, "error")
        : 0;
    return error;
  }
}
