import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { AuthHttp } from "../auth/auth-http";
import { ApplicationConfig } from "../shared/application-config";
import { User } from "../models/user";

@Injectable()
export class UserService {

  constructor(
      private http: AuthHttp,
      private config: ApplicationConfig) { }

  /**
   * Find the user by the remember_token value.
   *
   * @param token The remember_token of the user to find.
   * @return An observable which emits the found user.
   */


  findByToken(token: string): Observable<User> {
    return this.http
      .get(`${this.config.API_URL}v1/users?remember_token=${token}`)  // Need the user...
      .map((response) => response.json())
      .map((json) => this.factory(json.items[0]));
  }

  /**
   * Save the user.
   *
   * @param user The user to save.
   * @return An observable which emits the saved user.
   */

// TODO: NEED TO REIMPLEMENT THIS!!!!

  // save(user: User): Observable<User> {
  //   let userJson = JSON.stringify({ user: user });
  //   let obs = this.http
  //     .post(`${this.config.API_URL}v1/users`, userJson);
  //
  //   if (user.id) {
  //     obs = this.http.put(`${this.config.API_URL}v1/users/${user.id}`, userJson);
  //   }
  //
  //   return obs.map((response) => response.json())
  //     .map((json) => json as User);
  // }

  /**
   * Construct a user from the JSON API response.
   *
   * @param json The JSON from the API.
   * @return The User.
   */
  private factory(json: any): User {
    let u: User = json as User;
    u.locale = json.language_code;
    return u;
  }
}
