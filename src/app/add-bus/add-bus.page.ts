import { AuthenticationService } from './../services/authentication.service';
import { ApiService } from './../api.service';
import { LoadingService } from './../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.page.html',
  styleUrls: ['./add-bus.page.scss'],
})
export class AddBusPage implements OnInit {

  addBusForm: FormGroup;
  routes:any;
  isSubmitted = false;
  constructor(
    public loading: LoadingService,
    private authService: AuthenticationService,
    private apiService: ApiService,
    public loadingController: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder) {

  }

  async ngOnInit() {
    await this.getBusRoutes();
    this.addBusForm = this.formBuilder.group({
      busid: ['', Validators.required],
      driver: ['', Validators.required],
      contactno: ['', Validators.required],
      routeid: ['', Validators.required]
    });
  }

  
  async getBusRoutes() {
    await this.apiService.getBusRoutes()
      .subscribe(res => {
        this.routes = res;
      }, err => {
        console.log(err);
      });
  }

  async addBus() {
    this.loading.present();
    console.log(this.addBusForm.value);
    this.isSubmitted = true;
    await this.apiService.addBus(this.addBusForm.value).subscribe((res)=>{
      console.log(res);
    });
    this.loading.dismiss();
    this.router.navigateByUrl('bus');
  }

}
