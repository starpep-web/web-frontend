import HttpStatus from 'http-status-codes';
import { HttpError } from '../errors/http';

const FIRST_UNSUCCESSFUL_STATUS_CODE = 400;

export interface ResponseBody {
  status: number
  success: boolean
  data?: object | string | null
  error?: {
    name: string,
    description: string,
    message: string
  }
}

export class ResponseBuilder {
  private readonly _body: ResponseBody;

  public constructor() {
    this._body = {
      success: true,
      status: HttpStatus.OK
    };
  }

  public withStatusCode(statusCode: number): this {
    this._body.status = statusCode;
    this._body.success = statusCode < FIRST_UNSUCCESSFUL_STATUS_CODE;
    return this;
  }

  public withData(data: object | string): this {
    this._body.data = data;
    return this;
  }

  public withError(error: HttpError): this {
    this._body.error = {
      name: error.name,
      description: error.description,
      message: error.message
    };

    return this.withStatusCode(error.statusCode);
  }

  public build(): ResponseBody {
    if (!('data' in this._body) && !('error' in this._body)) {
      this._body.data = null;
    }

    return this._body;
  }

  get statusCode(): number {
    return this._body.status;
  }
}
