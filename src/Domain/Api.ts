import Http, { IHttp } from "../Infrastructure/Http";
import _ from "lodash";

export interface IApiRequest {
  method: string;
  path: string | string[];
  params: Object;
}

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

  request(options: IApiRequest): Promise<object | object[]> {
    return this.adapter.request({
      url: this.getUrl(options.path, options.params),
      method: options.method,
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
}
