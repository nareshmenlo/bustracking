import { AuthenticationService } from './../services/authentication.service';
import { ApiService } from './../api.service';
import { LoadingService } from './../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  addPersonForm: FormGroup;
  buses: any;
  stops: any;
  isSubmitted = false;
  constructor(
    public loading: LoadingService,
    private authService: AuthenticationService,
    private apiService: ApiService,
    public loadingController: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.getBuses();
    // this.getBusRoutes();
  }

  async getBuses() {
    await this.apiService.getBuses()
      .subscribe(res => {
        this.buses = res;
      }, err => {
        console.log(err);
      });
  }

  async getBusStops(e) {
    let busId = e.target.value;
    let routeId = '';
    await this.buses.forEach(bus => {
      if (busId == bus.BUSID) {
        routeId = bus.ROUTEID;
      }
    });
    if (routeId != '') {
      await this.apiService.getBusRoute(routeId)
        .subscribe(res => {
          this.stops= [res.DEST1,res.DEST2,res.DEST3,res.DEST4,res.DEST5];
          console.log(this.stops);
        }, err => {
          console.log(err);
        });
    }
  }

  ngOnInit() {
    this.addPersonForm = this.formBuilder.group({
      personid: ['', Validators.required],
      busid: ['', Validators.required],
      personname: ['', Validators.required],
      contact: ['', Validators.required],
      pass: ['', Validators.required],
      stop: ['', Validators.required]
    });
  }

  async addPerson() {
    this.loading.present();
    console.log(this.addPersonForm.value);
    this.isSubmitted = true;
    await this.apiService.addPerson(this.addPersonForm.value).subscribe((res) => {
      console.log(res);
    });
    this.loading.dismiss();
    this.router.navigateByUrl('person');
  }

}
