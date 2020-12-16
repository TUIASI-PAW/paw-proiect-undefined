import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterPreloader } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserRoles } from '../services/models/user/user.roles';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.getUserData();

        if (user) {
            if(route.data.roles.indexOf(UserRoles.ROLE_UNAUTHORIZED) !== -1) return true;

            else if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
                this.router.navigate(['/']);
                return false;
            }

            else return true;
        }
        else if (route.data.roles.indexOf(UserRoles.ROLE_UNAUTHORIZED) !== -1)
            return true;
        else {
            this.router.navigate(['autentificare'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}