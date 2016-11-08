import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ShowsPage Page');
  }

}
