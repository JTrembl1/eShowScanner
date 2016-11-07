import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CustomerService } from '../../providers/customer-service'
import { ShowService } from '../../providers/show-service'

/*
  Generated class for the ShowList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-list',
  templateUrl: 'show-list.html',
  providers: [[CustomerService],[ShowService]]
})
export class ShowListPage {

  public shows : any;
  public showService : ShowService;
  constructor(public navCtrl: NavController, public customerService: CustomerService, showService: ShowService) {
    this.showService = showService;
  }

  ionViewDidLoad() {
    console.log('Hello ShowListPage Page');
  }

  loadShows(){
    this.showService.load()
    .then(data => {
      this.shows = data;
    });
  }
}
