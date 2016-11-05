import { FacebookAuth, User } from '@ionic/cloud-angular';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';

@Component({
    templateUrl: 'login.html'//,
    //providers: [AuthenticationApi]
})
export class LoginPage {
    username:string;
    password:string;
    constructor(public nav: NavController, public facebookAuth: FacebookAuth, public user: User ) {//, public platform: Platform, public http: Http, public authenticationApi: AuthenticationApi) {
      this.nav = nav;
    }

    login() {
        // this.authenticationApi.login(this.userName, this.password).subscribe(
        //      data => {
        //        //Navigate to home page
        this.facebookAuth.login().then(this.navigate);//this.nav.setRoot(HomePage));
             }
      //     )
      //  }

      navigate() {
        this.nav.push(HomePage);
    }
}
