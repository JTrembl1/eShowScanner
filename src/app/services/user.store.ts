import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Store } from "@ngrx/store";

import { UserService } from "./user.service";
import { AuthStore } from "../auth/auth.store";
import { User } from "../models/user";
import { AppState } from "../models/app-state";


@Injectable()
export class UserStore {

  private _currentUser: BehaviorSubject<User>;

  constructor(
      private authStore: AuthStore,
      private userService: UserService,
      private _store: Store<AppState>) {

    this._currentUser = new BehaviorSubject<User>(null);
  }

  /**
   * Get the currently logged in user.
   *
   * @return An observable which emits the currently logged in user. Will emit null if no user is logged in.
   */
  getCurrentUser(): Observable<User> {
    return this._currentUser;
  }

  /**
   * Watch the credentials store and load the current user when it changes. This
   * method should be called once for the app.
   */
  watchCurrentUser() {
    this.authStore.getCredentials().subscribe((creds) => {
      if (creds === null) {
        this._currentUser.next(null);
        this._store.dispatch({
          type: "AUTH.LOGOUT",
          payload: null
        });
      } else {
        this.userService.findByToken(creds.token).subscribe((user) => {
          this._currentUser.next(user);
          this._store.dispatch({
            type: "AUTH.LOGIN_SUCCESS",
            payload: user
          });
        });
      }
    });
  }
}
