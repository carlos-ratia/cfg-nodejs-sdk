export interface IApiRequest {
  method: string;
  path: string | string[];
  params: Object;
}
