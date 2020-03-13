import Promise from "bluebird";
import { HttpRequest } from "./HttpRequest";

export interface IHttp {
  request(options: HttpRequest): Promise<object>;
}
