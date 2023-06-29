import { Injectable } from '@angular/core';
import { AuthFacade } from './facade/auth.facade';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authFacade: AuthFacade) {}

  canActivate() {
    return this.authFacade.isAuth$;
  }

  canLoad() {
    return this.authFacade.isAuth$;
  }
}
