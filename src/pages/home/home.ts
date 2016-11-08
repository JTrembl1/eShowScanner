import { Component } from '@angular/core';
import { FacebookAuth, User } from '@ionic/cloud-angular';

import { NavController } from 'ionic-angular';
import { ShowsPage } from '../shows/shows';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username:string;
  password:string;
  constructor(public nav: NavController, public facebookAuth: FacebookAuth, public user: User ) {//, public platform: Platform, public http: Http, public authenticationApi: AuthenticationApi) {
    this.nav = nav;

  }
  login() {
    this.facebookAuth.login().then(this.navigate);
  }

  navigate() {
      this.nav.push(ShowsPage);
  }
  fail() {
    alert('Failed to login.');
  }
}
