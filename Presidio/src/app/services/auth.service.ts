import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthHelperService } from '../helpers/auth-helper.service';
import { environment } from 'src/environments/environment';

/**
 * Auth Service for auth functions
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
/**
   * Creates an instance of AuthService.
   * @param {HttpClient} http
   * @param {AuthHelperService} authHelper
   * @param {Router} router
   * @memberof AuthService
   */
 constructor(
  private http: HttpClient,
  private authHelper: AuthHelperService,
  private router: Router
) {}

/**
 * gets auth token from cognito
 * @param {string} code
 * @returns {Promise<any>}
 * @memberof AuthService
 */
getAuthToken(code: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    /**
     * url header
     */
    const header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    /**
     * post params
     */
    const params =
      'grant_type=' +
      environment.GRANT_TYPE_AUTH +
      '&client_id=' +
      environment.sso_api_username +
      '&code=' +
      code +
      '&client_secret=' +
      environment.sso_api_pwd +
      '&redirect_uri=' +
      environment.redirectURL +
      '';
    this.http
      .post<any>(environment.cognitoTokenURL, params, { headers: header })
      .subscribe(data => {
        /**
         * user token
         */
        const token = data.id_token;
        this.authHelper.setAuthToken(data.id_token);
        this.authHelper.setRefreshToken(data.refresh_token);
        this.refreshToken();
        resolve(true);
      });
  });
}

/**
 * refresh token
 *
 * @returns
 * @memberof AuthService
 */
refreshToken() {
  return new Promise(async (resolve, reject) => {
    /**
     * url header
     */
    const header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const RefreshToken = this.authHelper.getRefreshToken();
    /**
     * post params
     */
    const params =
      'grant_type=' +
      environment.GRANT_TYPE_REFRESH +
      '&client_id=' +
      environment.sso_api_username +
      '&client_secret=' +
      environment.sso_api_pwd +
      '&redirect_uri=' +
      environment.redirectURL +
      '&scope=' +
      environment.SCOPE +
      '&refresh_token=' +
      RefreshToken +
      '';
    this.http
      .post<any>(environment.cognitoTokenURL, params, { headers: header })
      .subscribe(
        data => {
          /**
           * user token
           */
          const token = data.id_token;
          const refresh = RefreshToken;

          this.authHelper.setAuthToken(token);
          this.authHelper.setRefreshToken(refresh);
          resolve(true);
        },
        err => {
          reject(false);
        }
      );
  });
}

}
