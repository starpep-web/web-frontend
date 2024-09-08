export class RequestError extends Error {
  public readonly response: Response;
  public readonly data: object | string;

  constructor(message: string, response: Response, data: object | string) {
    super(message);
    this.response = response;
    this.data = data;
  }
}
