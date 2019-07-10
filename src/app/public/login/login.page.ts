import { AuthenticationService } from './../../services/authentication.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  loginForm: FormGroup;
  isSubmitted  =  false;
  constructor(
    public loading: LoadingService,
    private authService: AuthenticationService,
    public loadingController: LoadingController,
    private router: Router, 
    private formBuilder: FormBuilder) { }
 
    ngOnInit() {
      this.loginForm  =  this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
    }
  
  elogin() {
    this.loading.present();
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.elogin(this.loginForm.value.email, this.loginForm.value.password);
    this.loading.dismiss();
  }

  ologin() {
  //  this.authService.ologin();
  }
 
}