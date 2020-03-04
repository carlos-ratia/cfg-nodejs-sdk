import Api from "../Domain/Api";
import Http, {GET} from "../Infrastructure/Http";

export class CfgApi extends Api {
  protected readonly _domain: string = 'https://cfg.bunkerdb.com';

  constructor() {
    super(new Http());
  }
}

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
    this.api.request({
      method: GET,
      path: `instances/${this.client}/service/${this.service}`,
      params: {}
    }).then(console.log)
  }
}