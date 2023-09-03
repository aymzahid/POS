import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  property: any = 'hi ';
  constructor() {}

  ngOnInit() {}

  triggerEvent() {
    console.log(this.property);
  }
}
