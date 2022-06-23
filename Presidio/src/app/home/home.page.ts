import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tokenDetails: any;
  token: any;

user:any;
  constructor(private authService: AuthenticationService) {}
  async ngOnInit() {
    // this.user = await this.authService.getUserInfo();
    console.log('Token: ', localStorage.getItem('token'));

    this.token = localStorage.getItem('token');

    if (this.token) {
      const base64Url = this.token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      this.tokenDetails = JSON.parse(atob(base64));

      console.log(this.tokenDetails);
    }

}
// async logout() {
//   await this.authService.logout();
// }
logout(){
  this.authService.logout();
}

}
