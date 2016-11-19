import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { CookieService } from "angular2-cookie/core";
import { Http } from "../shared/http";
import { Credentials } from "./credentials";
import { AuthNotFoundError } from "./exceptions";
import { ApplicationConfig } from "../shared/application-config";

import { Observable } from "rxjs/Observable";
// import { Logger } from "log4ts";
/**
 * Service for fetching the user's credential information.
 */
@Injectable()
export class AuthService {

  private static CREDENTIALS_KEY: string = "ng_crds";

  //private log: Logger = Logger.getLogger("AuthService");

  constructor(
      private cookies: CookieService,
      private http: Http,
      private config: ApplicationConfig) { }

  /**
   * Fetch credentials from the data store (likely a cookie or localStorage)
   *
   * @return An observable that publishes the credentials.
   */
  getCredentials(): Observable<Credentials> {
    let credJson: any = this.cookies.getObject(AuthService.CREDENTIALS_KEY);

    if (!credJson || !credJson.id || !credJson.token) {
      return Observable.throw(new AuthNotFoundError());
    }

    let creds = new Credentials(credJson.id, credJson.token);
    console.log("Authenticated user with ID " + creds.id);
    return Observable.from([creds]);
  }

  /**
   * Log a user in via the API. Since a user has many 'Personas', this method returns
   * a list of available Personas. One of these must be selected as the logged in
   * personsa to complete the 'login' operation. In other words, this method only
   * half way logs you in. You  must tell the AuthStore which Persona you wish to
   * use, to complete the operation.
   *
   * @param credentials The users auth credentials.
   * @return An observable that emits the Personas available to the user attempting to login.
   */
  login(credentials: Credentials): any {
    let auth = {
      type: "basic",
      value: btoa(`${credentials.id}:${credentials.token}`)
    };

    let payload = JSON.stringify(auth);
    let headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", "Basic " + btoa(`${this.config.AUTH_PREFIX}:${this.config.AUTH_SECRET}`));
    return this.http
      .post(`${this.config.API_URL}/rest/auth/login`, payload, { headers: headers })
      .map((response) => response.json())
      .map((userJson) => userJson.exhibitor);
  }

  /**
   * Set the given credentials into cookie storage. This ensures the user's identiy
   * is remembered between page loads.
   *
   * In production, this cookie is managed by Rails, and so this method is currently
   * only expected to be used in the dev env, when Angular is running standalone.
   *
   * @param credentials The credentials to save/remember.
   */
  setCredentials(credentials: Credentials) {
    if (credentials) {
      this.cookies.putObject(AuthService.CREDENTIALS_KEY, credentials);
    } else {
      this.cookies.remove(AuthService.CREDENTIALS_KEY);
    }
  }
}
