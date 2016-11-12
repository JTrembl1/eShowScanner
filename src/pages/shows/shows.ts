import { Component } from '@angular/core';
import { BarcodeScanner } from 'ionic-native';
import { Platform, Alert, AlertController, NavController} from 'ionic-angular';

/*
  Generated class for the Shows page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-shows',
  templateUrl: 'shows.html'
})
export class ShowsPage {

  // platform : any;
  // navController : NavController;
  static get parameters() {
          return [[Platform], [NavController]];
      }

      constructor(private platform : Platform, private navController : NavController, private alertCtrl: AlertController) {
          this.platform = platform;
          this.navController = navController;
      }

  ionViewDidLoad() {
    console.log('Hello ShowsPage Page');
  }

  scan() {
          this.platform.ready().then(() => {
              BarcodeScanner.scan().then((result) => {
                this.presentAlert(result);
              }, (error) => {
                this.presentAlert(error);
              });
          });
      }

      presentAlert(data: any) {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: data,
          buttons: ['Dismiss']
        });
        alert.present();
      }
}
