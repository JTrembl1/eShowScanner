import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";

import { Http } from "../shared/http";
import { AuthStore } from "./auth.store";
import { Credentials } from "./credentials";
import { ApplicationConfig } from "../shared/application-config";

/**
 * Wrap the Angular Http class, and automatically add our authentication data.
 */
@Injectable()
export class AuthHttp {

  constructor(
    private http: Http,
    private authStore: AuthStore,
    private config: ApplicationConfig) {}

  /**
   * Perform an HTTP GET request, with authentication headers set for the Lopez API.
   * This lightly wraps the HTTP Angular class, so see that for detailed information.
   */
  get(url: string, options?: any|RequestOptions) {
    let headers = null;
    if (options) {
      headers = options.headers;
    } else {
      options = {};
    }

    options.body = "";

    return this.authStore
      .getCredentials()
      .flatMap((credentials) => {
        options.headers = this.headersWithCredentials(credentials, headers);
        return this.http.get(url, options);
      });
  }

  /**
   * Perform an HTTP POST request, with authentication headers set for the Lopez API.
   * This lightly wraps the HTTP Angular class, so see that for detailed information.
   */
  post(url: string, body: string, options?: any|RequestOptions) {
    let headers = null;
    if (options) {
      headers = options.headers;
    } else {
      options = {};
    }

    return this.authStore
      .getCredentials()
      .flatMap((credentials) => {
        options.headers = this.headersWithCredentials(credentials, headers);
        return this.http.post(url, body, options);
      });
  }

  /**
   * Send a PUT HTTP request, with authentication headers set for the Lopez API.
   * This lightly wraps the HTTP Angular class, so see that for detailed information.
   */
  put(url: string, body: string, options?: any|RequestOptions) {
    let headers = null;
    if (options) {
      headers = options.headers;
    } else {
      options = {};
    }

    return this.authStore
      .getCredentials()
      .flatMap((credentials) => {
        options.headers = this.headersWithCredentials(credentials, headers);
        return this.http.put(url, body, options);
      });
  }

  /**
   * Send a DELETE HTTP request, with authentication headers set for the Lopez API.
   * This lightly wraps the HTTP Angular class, so see that for detailed information.
   */
  delete(url: string, options?: any|RequestOptions) {
    let headers = null;
    if (options) {
      headers = options.headers;
    } else {
      options = {};
    }

    if (!options.body) {
      options.body = "";
    }

    return this.authStore
      .getCredentials()
      .flatMap((credentials) => {
        options.headers = this.headersWithCredentials(credentials, headers);
        return this.http.delete(url, options);
      });
  }

  /**
   * Create and set the authorization header.
   *
   * @return The headers to be used in the request.
   */
  private headersWithCredentials(credentials: Credentials, headers: Headers): Headers {
    if (!headers) {
      headers = new Headers();
    }

    headers.set("Content-Type", "application/json");

    if (credentials) {
      headers.set("Authorization", "Basic " + btoa(`${this.config.API_PREFIX}${credentials.id}:${credentials.token}`));
    }

    return headers;
  }
}
