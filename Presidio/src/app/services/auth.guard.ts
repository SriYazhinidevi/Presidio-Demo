import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor (
    private authentication: AuthenticationService,
    private navCtrl: NavController) { }
  async canActivate(): Promise<boolean> {
    const authed = await this.authentication.isAuthenticated();
    if (authed) {
      return true;
    } else {
      this.navCtrl.navigateRoot('/login');
      return false;
    }
  }
  
}
