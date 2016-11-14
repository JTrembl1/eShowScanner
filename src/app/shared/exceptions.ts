import { Response } from "@angular/http";

export class HttpError extends Error {
  constructor(message: string, public response: Response) {
    super(message);
  }

  get apiMessage(): string {
    let apiJson = this.response.json();
    return apiJson && apiJson.error ? apiJson.error.message : "";
  }
}

/** HTTP 4xx */
export class HttpClientError extends HttpError { }

/** HTTP 400 */
export class HttpBadRequestError extends HttpClientError { }

/** HTTP 401 */
export class HttpUnauthorizedError extends HttpClientError { }

/** HTTP 403 */
export class HttpForbidenError extends HttpClientError { }

/** HTTP 404 */
export class HttpNotFoundError extends HttpClientError { }

/** HTTP 409 */
export class HttpConflictError extends HttpClientError { }

/** HTTP 422 */
export class HttpUnprocessableEntity extends HttpClientError { }

/** HTTP 5xx */
export class ServerError extends HttpError { }
