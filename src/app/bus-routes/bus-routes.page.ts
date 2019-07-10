import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { BusRoute } from '../bus-route';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.page.html',
  styleUrls: ['./bus-routes.page.scss'],
})
export class BusRoutesPage implements OnInit {

  routes: BusRoute;
  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getBusRoutes();
  }



  async getBusRoutes() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getBusRoutes()
      .subscribe(res => {
        this.routes = res;
        console.log(this.routes);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}

