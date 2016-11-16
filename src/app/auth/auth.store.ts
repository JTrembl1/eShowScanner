import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from "@angular/core";
import { Credentials } from "./credentials";
import { AuthService } from "./auth.service";
import { Exhibitor } from "../models/Exhibitor";

/**
 * A stateful class providing authentication information.
 */
@Injectable()
export class AuthStore {

  /*
   * Observe the credentials. Since a user may login/logout multiple times, this
   * is exposed as a stream. Clients should be equiped to handle null's since that
   * is what will be provided if no user is logged in.
   */
   repo: BehaviorSubject<Credentials>;

  constructor(private authService: AuthService) {
    this.repo = new BehaviorSubject<Credentials>(null);

    this.authService.getCredentials().subscribe(
      (credentials) => {
        this.repo.next(credentials);
      },
      (error) => {
        console.log("Unable to get auth credentials from service", error);
        this.repo.next(null);
      }
    );
  }

  /**
   * @return An observable for the current auth of the user.
   */
  getCredentials(): BehaviorSubject<Credentials> {
    return this.repo;
  }

  /**
   * Log a user in via the API. Since a user has many 'Personas', this method returns
   * a list of available Personas. One of these must be selected as the logged in
   * personsa to complete the 'login' operation. In other words, this method only
   * half way logs you in. You  must tell the AuthStore which Persona you wish to
   * use, to complete the operation.
   *
   * @param credentials The users auth credentials.
   * @return An observable that emits the Personas available to the user attempting to login.
   */
  login(credentials: Credentials): any {
    console.log(credentials.id + " " + credentials.token);
    let result = this.authService.login(credentials);

    return result;
  }

  activateUser(exhibitor : Exhibitor){
    if (exhibitor) {
      console.log("Setting persona " + exhibitor.TPCExhibitorID);
      let creds = new Credentials(exhibitor.TPCExhibitorID, exhibitor.Email);
      this.authService.setCredentials(creds);
      this.repo.next(creds);
    } else {
      this.logout();
    }

  }

  /**
   * Log the current user out.
   */
  logout() {
    this.repo.next(null);
    this.authService.setCredentials(null);
  }
}
