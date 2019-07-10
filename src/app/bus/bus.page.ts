import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Bus } from '../bus';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage implements OnInit {
  buses: Bus;
  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) {

      console.log('Bus page consturctor');
     }

    ngOnInit() {
      this.getBuses();
    }

    

  async getBuses() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getBuses()
      .subscribe(res => {
        this.buses = res;
        console.log(this.buses);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }


}
