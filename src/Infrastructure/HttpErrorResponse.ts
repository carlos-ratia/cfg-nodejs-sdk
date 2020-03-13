import { IApiResponse } from "../Domain/IApiResponse";

export class HttpErrorResponse extends Error {
  private _status: string;
  private _error: Object[];

  get status(): string {
    return this._status;
  }
  get error(): Object[] {
    return this._error;
  }

  constructor(status: string, error: Object[]) {
    super();
    this._status = status;
    this._error = error;
  }

  get(): IApiResponse {
    return {
      statusCode: this.status,
      data: [],
      debug: [],
      error: this.error,
    };
  }
}
