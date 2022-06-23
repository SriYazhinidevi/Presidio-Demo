import { Injectable,NgZone } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

declare var window: any;
class DeviceDetails {
	fcmToken: string;
	deviceId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  deviceDetails = {
		fcmToken: '',
		deviceId: '',
	};
	/**
	 * Creates an instance of AuthHelperService.
	 * @param {Router} router
	 * @memberof AuthHelperService
	 */
	constructor(
		private router: Router,
		private plt: Platform,
		private http: HttpClient,
		private ngZone: NgZone,
		private platform: Platform,
		private storage: Storage
	) {}
  /**
	 * helper object of jwthelper
	 * @private
	 * @memberof AuthHelperService
	 */
	private helper = new JwtHelperService();

	/**
	 * sets user token
	 * @param {string} userToken
	 * @memberof AuthHelperService
	 */
	setAuthToken = (userToken: string) => {
		localStorage.setItem('token', userToken);
	};

	/**
	 * set refresh token
	 *
	 * @memberof AuthHelperService
	 */
	setRefreshToken = (refreshToken: string) => {
		localStorage.setItem('refresh', refreshToken);
	};

	/**
	 * get refresh token from local storage
	 * @returns
	 * @memberof AuthHelperService
	 */
	getRefreshToken = () => {
		return localStorage.getItem('refresh');
	};

	/**
	 * get auth token from local storage
	 * @returns
	 * @memberof AuthHelperService
	 */
	getAuthToken = () => {
		return localStorage.getItem('token');
	};
	/**
	 * set TutorialShown
	 *
	 * @memberof AuthHelperService
	 */
	setTutorial = (tutorial: string) => {
		localStorage.setItem('tutorial', tutorial);
	};
	/**
	 * set TutorialShown
	 *
	 * @memberof AuthHelperService
	 */
	getTutorial = () => {
		return localStorage.getItem('tutorial');
	};
	/**
	 * gets user id from token
	 * @param {string} token
	 * @returns
	 * @memberof AuthHelperService
	 */
	getUserId = (token: string) => {
		/**
		 * payload data from token
		 */
		const payload = this.getDecodedAccessToken(token);
		return payload.identities[0].userId;
	};

	/**
	 * get userName from token
	 * @param {string} token
	 * @returns
	 * @memberof AuthHelperService
	 */
	getUsername = (token: string) => {
		/**
		 * payload data from token
		 */
		const payload = this.getDecodedAccessToken(token);
		return payload['cognito:username'];
	};

	/**
	 * get usermail from token
	 * @param {string} token
	 * @returns
	 * @memberof AuthHelperService
	 */
	getUserEmail = (token: string) => {
		/**
		 * payload data from token
		 */
		const payload = this.getDecodedAccessToken(token);
		return payload.identities[0].userId;
	};

	/**
	 * gets expiration time of token
	 * @param {string} token
	 * @returns
	 * @memberof AuthHelperService
	 */
	getTockenExpireTime = (token: string) => {
		return this.helper.getTokenExpirationDate(token);
	};

	/**
	 * check expiration of token
	 * @param {string} token
	 * @returns
	 * @memberof AuthHelperService
	 */
	checkTockenExpiration = (token: string) => {
		return this.helper.isTokenExpired(token);
	};

	/**
	 * logs out from app
	 * @memberof AuthHelperService
	 */
	logout = async () => {
		this.deviceDetails.deviceId = localStorage.getItem('deviceId');
		this.deviceDetails.fcmToken = localStorage.getItem('fcmKey');
		this.platform.ready().then(() => {
			this.storage.clear();
		});
		this.router.navigateByUrl('login').then(async () => {
			// this.plt.is('')
			if (this.plt.is('capacitor')) {
				
				const browserRef = window.cordova.InAppBrowser.open(
					environment.logout,
					'_blank',
					'location=no,clearsessioncache=yes,clearcache=yes,hardwareback=no,hideurlbar=yes,hidden=yes'
				);
				browserRef.addEventListener('loadstart', (event) => {
					browserRef.close();
					this.ngZone.run(() => {
						localStorage.removeItem('token');
						localStorage.removeItem('refresh');
						this.router.navigateByUrl('login');
					});
				});
			} else {
				/**
				 * browser reference for webapp
				 */
				this.http.get(environment.logout).subscribe(
					(data) => {
						localStorage.removeItem('token');
						localStorage.removeItem('refresh');
					},
					(err) => {
						console.log(err);
						localStorage.removeItem('token');
						localStorage.removeItem('refresh');
						this.router.navigateByUrl('login');
					}
				);
				// window.open(Constants.LOGOUT_URL, '_self', 'location=no');
			}
		});
	};

	/**
	 * get decoded token data
	 * @param {string} token
	 * @returns {*}
	 * @memberof AuthHelperService
	 */
	getDecodedAccessToken = (token: string): any => {
		try {
			return this.helper.decodeToken(token);
		} catch (Error) {
			return null;
		}
	};

}
