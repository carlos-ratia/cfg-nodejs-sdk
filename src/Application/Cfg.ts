import { GET } from "../Infrastructure/Http";
import { CfgApi } from "./CfgApi";

export class Cfg {
  private readonly _api: CfgApi;

  private readonly _client: string;
  private readonly _service: string;

  get api(): CfgApi {
    return this._api;
  }

  get client(): string {
    return this._client;
  }

  get service(): string {
    return this._service;
  }

  constructor(client: string, service: string) {
    this._api = new CfgApi();
    this._client = client;
    this._service = service;
  }

  get() {
    return this.api
      .request({
        method: GET,
        path: `instances/${this.client}/services/${this.service}`,
        params: {},
      })
      .then(response => {
        return response;
      });
  }
}
