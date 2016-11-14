import { Component } from '@angular/core';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { AuthStore } from "../../services/auth/auth.store";
import { AuthService } from "../../services/auth/auth.service";
import { NavController } from 'ionic-angular';
import { ShowsPage } from '../shows/shows';
import { Credentials } from "../../services/auth/credentials";
import { CookieService } from "angular2-cookie/core";
import { Http } from "../../shared/http";
import { ApplicationConfig } from "../../shared/application-config";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ AuthStore, AuthService, CookieService, Http, ApplicationConfig ]
})
export class HomePage {
  username : string;
  password : string;
  loggedIn : boolean = false;
  token : String;
  fb : boolean = false;
  authStore : AuthStore;
  credentials : Credentials;

  constructor(public nav: NavController, public facebookAuth: FacebookAuth, public user: User, authStore: AuthStore ) {
    this.nav = nav;
    this.authStore = authStore;
    this.credentials = new Credentials(null, null);

  }
  login() {
    if (this.fb) {
      this.facebookAuth.login().then(this.navigate);
    } else {
          let creds = new Credentials(this.username, this.password);
          console.log("Creds:" + creds);
          //this.authStore.login(creds).subscribe((data) => {
          this.loggedIn = true;
          // this.token = data;
          // console.log(data);
          this.navigate();
          return;
          // }, (error) => {
          //   console.log("Unable to login", error);
          // });

      // this.authStore.login(this.credentials);
      // let creds = new Credentials(this.username, this.password);
      // this.authStore.login(creds).then(this.navigate);
    }
  }

  navigate() {
      this.nav.push(ShowsPage);
  }
  fail() {
    alert('Failed to login.');
  }
}
