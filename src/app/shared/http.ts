import { Injectable } from "@angular/core";
import { Http as AngularHttp, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import {
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpForbidenError,
  HttpNotFoundError,
  HttpConflictError,
  HttpUnprocessableEntity,
  HttpClientError,
  ServerError } from "./exceptions";

@Injectable()
export class Http {

  constructor(private http: AngularHttp) { }

  get(url: string, options?: RequestOptions): Observable<Response> {
    return this.http
      .get(url, options)
      .catch((response, obs) => Observable.throw(this.httpErrorCodeToException(response)));
  }

  post(url: string, body: string, options?: any|RequestOptions) {
    return this.http
      .post(url, body, options)
      .catch((response, obs) => Observable.throw(this.httpErrorCodeToException(response)));
  }

  put(url: string, body: string, options?: any|RequestOptions) {
    return this.http
      .put(url, body, options)
      .catch((response, obs) => Observable.throw(this.httpErrorCodeToException(response)));
  }

  delete(url: string, options?: any|RequestOptions) {
    return this.http
      .delete(url, options)
      .catch((response, obs) => Observable.throw(this.httpErrorCodeToException(response)));
  }

  protected httpErrorCodeToException(response: Response) {
    switch (response.status) {
      case 400:
        return new HttpBadRequestError("bad request", response);
      case 401:
        return new HttpUnauthorizedError("unauthorized", response);
      case 403:
        return new HttpForbidenError("forbidden", response);
      case 404:
        return new HttpNotFoundError("not found", response);
      case 409:
        return new HttpConflictError("conflict", response);
      case 422:
        return new HttpUnprocessableEntity("unprocessable entity", response);
    }

    if (response.status >= 400 && response.status < 500) {
      return new HttpClientError("client error", response);
    }

    if (response.status >= 500) {
      return new ServerError("server error", response);
    }
  }
}
