import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
/*
  Generated class for the ScanBoothData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scan-booth-data',
  templateUrl: 'scan-booth-data.html'
})
export class ScanBoothDataPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ScanBoothDataPage Page');
  }

  goHome() {
    this.navCtrl.push('HomePage');
  }
}
