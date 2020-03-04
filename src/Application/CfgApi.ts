import Api from "../Domain/Api";
import Http from "../Infrastructure/Http";

export class CfgApi extends Api {
  protected readonly _domain: string = "https://cfg.bunkerdb.com";

  constructor() {
    super(new Http());
  }
}
