import { Component, OnInit ,NgZone} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { AuthHelperService } from '../helpers/auth-helper.service';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { Browser } from '@capacitor/browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {
	NativeTransitionOptions,
	NativePageTransitions,
} from '@ionic-native/native-page-transitions/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
declare var window: any;

class DeviceDetails {
	fcmToken: string;
	deviceId: string;
}
/**
 * login page view
 * @export
 * @class LoginPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

/**
	 * loading variable for loader component
	 * @type {boolean}
	 * @memberof LoginPage
	 */
 loading = false;
 /**
  *
  * Completed boolean
  * @memberof LoginPage
  */
 completed = false;
 /**
  * user code from cognito
  * @type {string}
  * @memberof LoginPage
  */
 userCode: string;

 /**
  *
  * Opions for Animation
  * @type {NativeTransitionOptions}
  * @memberof LoginPage
  */
 options: NativeTransitionOptions = {
   direction: 'left',
   duration: 500,
   slowdownfactor: -1,
   slidePixels: -1,
   iosdelay: 100,
   androiddelay: 150,
 };
 deviceDetails = new DeviceDetails();
 // deviceId;
/**
	 * Creates an instance of LoginPage.
	 * @param {AuthService} authService
	 * @param {ActivatedRoute} route
	 * @param {Router} router
	 * @param {Platform} plt
	 * @param {AuthHelperService} authHelper
	 * @param {NgZone} ngZone
	 * @memberof LoginPage
	 */
constructor(
  private authService: AuthService,
  private route: ActivatedRoute,
  private plt: Platform,
  private authHelper: AuthHelperService,
  private ngZone: NgZone,
  private router: Router,
  private statusBar: StatusBar,
  private platform: Platform
){}

/**
 * oninit
 * @memberof LoginPage
 */
ngOnInit() {
  const authToken = this.authHelper.getAuthToken();
  if (authToken && authToken.length > 1) {
    // this.router.navigateByUrl('dashboard').then(() => {
    this.router.navigate(['home'], {
      queryParams: { reload: true },
    });
    // });
  }
  if (this.authHelper.getAuthToken()) {
    this.loading = false;
  }
  this.route.queryParamMap.subscribe((params) => {
    this.userCode = params.get('code');
  });
  if (this.userCode !== null) {
    this.loading = true;
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#2f3863');
    this.authService.getAuthToken(this.userCode).then(() => {
      this.completed = true;
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByName('white');
      
    });
  }
}

ionViewWillEnter() {
  this.platform.ready().then(() => {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByName('white');
    this.statusBar.styleDefault();
    this.statusBar.show();
  });
}
/**
 * gets user code from sso
 * @memberof LoginPage
 */
userLogin() {
  this.loading = true;
  this.statusBar.styleDefault();
  this.statusBar.overlaysWebView(true);
  this.statusBar.backgroundColorByName('white');
  if (this.plt.is('capacitor') || this.plt.is('ios')) {
    this.statusBar.styleDefault();
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByName('white');
    this.statusBar.show();

    /**
     * browser reference for android
     */
    const browserRef = window.cordova.InAppBrowser.open(
      environment.loginURL,
      '_blank',
      'location=no,zoom=no,fullscreen=yes'
    );
    this.loading = false;
    browserRef.addEventListener('loadstart', (event) => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByName('white');
      this.loading = false;
      this.statusBar.overlaysWebView(false)
      this.statusBar.backgroundColorByHexString('#2f3863');
      if (event.url.indexOf('http://localhost:8100/callback') === 0) {
        this.loading = true;
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#2f3863');
        browserRef.removeEventListener('exit', () => {});
        browserRef.close();
        /**
         * user code from url
         */
        const responseCode = event.url.split('=')[1];
        this.ngZone.run(() => {
          this.authService.getAuthToken(responseCode).then(() => {
            setTimeout(() => {
              this.deviceDetails.deviceId = localStorage.getItem('deviceId');
              this.deviceDetails.fcmToken = localStorage.getItem('fcmKey');
              this.completed = true;
              this.router
												.navigate(['home'], {
													queryParams: { reload: true },
												})
												.then(() => {
													this.statusBar.overlaysWebView(false);
													this.statusBar.backgroundColorByName('white');
													this.statusBar.styleDefault();
													this.statusBar.show();
													this.loading = false;
													this.completed = false;
												});
            }, 10);
          });
        });
      }
    });
  } else {
    /**
     * browser reference for webapp
     */

    window.open(environment.loginURL, '_self', 'location=no,');
  }
}








  // errorMessage: string;
  // loading = false;
  // completed = false;
 

  // async ngOnInit() {
  //   // Web only: If redirected back to app after login and using implicitLogin = 'CURRENT' (current window),
  //   // pass along the auth details, such as access token, to Auth Connect
  //   if (window.location.hash) {
  //     const loadingIndicator = await this.showLoadingIndictator();
  //     try {
  //       // Once handleCallback completes, Auth Connect calls onLoginSuccess() in Authentication service
  //       await this.authService.handleCallback(window.location.href);
  //     } catch (e) {
  //       this.errorMessage = e.message;
  //     } finally {
  //       loadingIndicator.dismiss();
  //     }
  //   }
  // }

  // // async login() {
  // //   const loadingIndicator = await this.showLoadingIndictator();
  // //   try {
  // //     await this.authService.login();
  // //   } catch (e) {
  // //     console.log(`caught error as ${e.message}`);
  // //   } finally {
  // //     loadingIndicator.dismiss();
  // //   }
  // // }

  // private async showLoadingIndictator() {
  //   const loadingIndicator = await this.loadingController.create({
  //     message: 'Opening login window...'
  //   });
  //   await loadingIndicator.present();
  //   return loadingIndicator;
  // }
  // async navigateToDashboard(): Promise<void> {
  //  // await Browser.open({ url: environment.loginURL });
  //   //this.iab.create(environment.loginURL);
  //   // window.location.assign(environment.loginURL);
  //  const browserRef =  window.open(environment.loginURL, '_blank', 'location=no,zoom=no,fullscreen=yes');
  // //  this.loading = false;
	// // 		browserRef.addEventListener('loadstart', (event:any) => {
	// // 			this.loading = false;
	// // 			// this.statusBar.overlaysWebView(false)
	// // 			// this.statusBar.backgroundColorByHexString('#2f3863');
	// // 			if (event.url.indexOf('http://localhost:8100/login') === 0) {
	// // 				this.loading = true;
	// // 				browserRef.removeEventListener('exit', () => {});
	// // 				browserRef.close();
				


}

