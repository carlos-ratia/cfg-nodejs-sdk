import request from "request-promise";
import { Headers} from "request";
import {Url} from "url";

interface HttpRquest {
  url: string | Url;
  method?: string;
  headers?: Headers;
}

export default class Http {
  request(options: ) {
    return request({
      url: options.url,
      method: options.method,
      headers: options.headers,
    })
      .then(response => {
        return response;
      })
      .catch(error => {});
  }
}
