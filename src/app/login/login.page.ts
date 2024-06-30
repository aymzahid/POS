import { GlobalVariable } from 'src/global';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private globals: GlobalVariable,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (
      this.credentials.value.email === 'com' &&
      this.credentials.value.password === 'com'
    ) {
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
      this.credentials.reset();
    } else {
      this.globals.presentToast('Invalid Username or Password!', '', 'danger');
    }

    // this.globals.loader();

    // this.authService.login(this.credentials.value).subscribe(
    //   async (res: any) => {
    //     console.log(res);

    //     this.globals.dismiss();
    //     this.router.navigateByUrl('/tabs', { replaceUrl: true });
    //   },
    //   async (err: any) => {
    //     this.globals.dismiss();

    //     this.globals.presentToast(
    //       'Something went wrong, try again later',
    //       '',
    //       'danger'
    //     );
    //   }
    // );
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
