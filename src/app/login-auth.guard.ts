import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AdminService} from './admin.service';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.adminService.isLogged()) {
      return true;
    }

    this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}