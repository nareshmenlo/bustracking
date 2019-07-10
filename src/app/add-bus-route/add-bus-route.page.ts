import { AuthenticationService } from './../services/authentication.service';
import { ApiService } from './../api.service';
import { LoadingService } from './../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bus-route',
  templateUrl: './add-bus-route.page.html',
  styleUrls: ['./add-bus-route.page.scss'],
})
export class AddBusRoutePage implements OnInit {

  addBusRouteForm: FormGroup;
  isSubmitted = false;
  constructor(
    public loading: LoadingService,
    private authService: AuthenticationService,
    private apiService: ApiService,
    public loadingController: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.addBusRouteForm = this.formBuilder.group({
      routeid: ['', Validators.required],
      destinations: this.formBuilder.array([])
    });
    [0].forEach(destination => {
      this.addDestination();
    })
  }

  addDestination() {
    let destinations = this.addBusRouteForm.get('destinations') as FormArray;
    destinations.push(this.formBuilder.control(false));
  }

  async addBusRoute() {
    this.loading.present();
    console.log(this.addBusRouteForm.value);
    this.isSubmitted = true;
    await this.apiService.addBusRoute(this.addBusRouteForm.value).subscribe((res) => {
      console.log(res);
    });
    this.loading.dismiss();
    this.router.navigateByUrl('bus-routes');
  }

}

