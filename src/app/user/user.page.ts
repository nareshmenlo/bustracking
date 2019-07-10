import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Person } from '../person';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  persones: Person;
  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) { }

    ngOnInit() {
      this.getPersones();
    }

    

  async getPersones() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getPersons()
      .subscribe(res => {
        this.persones = res;
        console.log(this.persones);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}

