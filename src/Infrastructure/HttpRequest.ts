import { Url } from "url";
import { Headers } from "request";

export interface HttpRequest {
  url: string | Url;
  method: string;
  headers?: Headers;
}
