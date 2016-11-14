import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShowsPage } from '../pages/shows/shows';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { ScanBoothDataPage } from '../pages/scan-booth-data/scan-booth-data';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8d572ca1'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShowsPage,
    ScanBoothDataPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShowsPage,
    ScanBoothDataPage
  ],
  providers: []
})
export class AppModule {}
