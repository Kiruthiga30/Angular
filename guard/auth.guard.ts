import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRoles = this.authService.getUserRoles();

    if (userRoles.length === 0) {
      this.router.navigate(['/register']);
      return false;
    }

    const url = state.url;

    console.log(userRoles, url);
    if (url.includes('home') && userRoles.includes('admin')) {
      return true;
    } else if (url.includes('book') && (userRoles.includes('bookmanager') || userRoles.includes('admin'))) {
      return true;
    } else if (url.includes('author') && (userRoles.includes('authormanager') || userRoles.includes('admin'))) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
