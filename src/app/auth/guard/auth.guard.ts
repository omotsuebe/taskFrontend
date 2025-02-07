import { inject } from '@angular/core';
import {Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

export const AuthGuard = (
  state: RouterStateSnapshot,
  router = inject(Router),
  authService = inject(AuthService)
): boolean => {
  if (authService?.isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login'], {
      queryParams: { redirect: state.url },
      replaceUrl: true,
    });
    return false;
  }
};
