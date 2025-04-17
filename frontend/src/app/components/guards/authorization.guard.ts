import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'; // Ensure correct import
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let authorizedRoles: string[] = route.data['roles'];
    let userRoles: string[] = this.authService.roles;

    // ✅ Check if user has any of the required roles
    if (authorizedRoles.some(role => userRoles.includes(role))) {
      return true; // ✅ User is authorized
    }

    // 🚫 Redirect to unauthorized page if access is denied
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
