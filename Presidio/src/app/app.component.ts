import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthenticationService,
    private navController: NavController,
    private platform: Platform) {
      this.initializeApp();

    this.auth.loginStatusChanged.subscribe(authenticated => 
         this.handleAuthChange(authenticated));
    }
    async initializeApp() {
      const { SplashScreen } = Plugins;
      if (this.platform.is('hybrid')) {
        await SplashScreen.hide();
      }
    }
    private handleAuthChange(authenticated: boolean) {
      if (authenticated) {
        this.navController.navigateRoot(['home']);
      } else {
        this.navController.navigateRoot(['login']);
      }
    }
}
