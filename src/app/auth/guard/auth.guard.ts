import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {CredentialsService} from '@app/core/services/credentials.service';

export const AuthGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  router = inject(Router),
  credentialsService = inject(CredentialsService)) => {
  credentialsService.isAuthenticated() ? true : router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
};

