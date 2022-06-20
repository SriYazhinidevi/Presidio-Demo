import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { ModalController } from '@ionic/angular';
import { SplashComponent } from './splash/splash.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthenticationService,
    private navController: NavController,
    private platform: Platform,public modalController: ModalController) {
      this.presentSplash();

    this.auth.loginStatusChanged.subscribe(authenticated => 
         this.handleAuthChange(authenticated));
    }
    async initializeApp() {
      const { SplashScreen } = Plugins;
      if (this.platform.is('hybrid')) {
        await SplashScreen.hide();
      }
    }
    async presentSplash() {
      const modal = await this.modalController.create({
        component: SplashComponent,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }
    private handleAuthChange(authenticated: boolean) {
      if (authenticated) {
        this.navController.navigateRoot(['home']);
      } else {
        this.navController.navigateRoot(['login']);
      }
    }
}
