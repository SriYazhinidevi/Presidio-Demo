import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
//import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessage: string;

  constructor(private authService: AuthenticationService, private loadingController: LoadingController) {}

  async ngOnInit() {
    // Web only: If redirected back to app after login and using implicitLogin = 'CURRENT' (current window),
    // pass along the auth details, such as access token, to Auth Connect
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndictator();
      try {
        // Once handleCallback completes, Auth Connect calls onLoginSuccess() in Authentication service
        await this.authService.handleCallback(window.location.href);
      } catch (e) {
        this.errorMessage = e.message;
      } finally {
        loadingIndicator.dismiss();
      }
    }
  }

  async login() {
    const loadingIndicator = await this.showLoadingIndictator();
    try {
      await this.authService.login();
    } catch (e) {
      console.log(`caught error as ${e.message}`);
    } finally {
      loadingIndicator.dismiss();
    }
  }

  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Opening login window...'
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
  async navigateToDashboard(): Promise<void> {
   // await Browser.open({ url: environment.loginURL });
    //this.iab.create(environment.loginURL);
     window.location.assign(environment.loginURL);
  }


}
