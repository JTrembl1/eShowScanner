import { Component } from '@angular/core';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { AuthStore } from "../../auth/auth.store";
import { AuthService } from "../../auth/auth.service";
import { NavController, LoadingController } from 'ionic-angular';
import { ShowsPage } from '../shows/shows';
import { Credentials } from "../../auth/credentials";
import { CookieService } from "angular2-cookie/core";
import { Http } from "../../shared/http";
import { ApplicationConfig } from "../../shared/application-config";
import { Exhibitor } from "../../models/Exhibitor";
import {Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ AuthStore, AuthService, CookieService, Http, ApplicationConfig ]
})
export class HomePage {
  username : string;
  password : string;
  loggedIn : boolean = false;
  token : string;
  fb : boolean = false;
  authStore : AuthStore;
  credentials : Credentials;
  loginForm : FormGroup;

  constructor(public nav: NavController,
    private loadingCtrl: LoadingController,
    authStore: AuthStore,
    private formBuilder: FormBuilder ) {

      this.loginForm = this.formBuilder.group({
        id: ['', Validators.required],
        token: ['', Validators.required],
      });

      this.nav = nav;
      this.authStore = authStore;
      this.credentials = new Credentials(null, null);
  }

  // ionViewDidLoad() {
  //
  // }

  skipLogin() {
  this.nav.setRoot(ShowsPage, {}, {
    animate: true
  });
  }

  login() {
          this.credentials.id = this.loginForm.value.id;
          this.credentials.token = this.loginForm.value.token;
          //let creds = new Credentials(this.username, this.password);
          let loading = this.loadingCtrl.create({ content: 'Authenticating...'});
          this.authStore.login(this.credentials).subscribe((exhibitor : Exhibitor) => {
            loading.present();
            this.loggedIn = true;
            // this.token = data;
            // console.log(data);
            this.nav.setRoot(ShowsPage, {}, {
              animate: true
            }).then(() => {
              loading.dismiss();
            });
            this.authStore.activateUser(exhibitor);
          return;
          }, (error) => {
              this.fail(error);
          });

      // this.authStore.login(this.credentials);
      // let creds = new Credentials(this.username, this.password);
      // this.authStore.login(creds).then(this.navigate);
  }

  fail(error : any) {
    alert('Failed to login:' + error);
    return;
  }
}
