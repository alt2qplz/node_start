export class HTTPError extends Error {
  statusCode: number;
  context?: string;

  constructor(statusCode: number, message: string, context?: string) {
    super(message);
    this.statusCode = statusCode;
    // this.message = message; //это не избыточно, разве сообщение не будет уже в Error?
    this.context = context;
  }
}