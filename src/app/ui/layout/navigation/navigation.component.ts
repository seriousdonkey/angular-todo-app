import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AuthFacade } from '../../../auth/facade/auth.facade';
import { AuthState } from '../../../auth/auth.reducer';
import { RouterModule } from '@angular/router';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public get isLoggedIn(): boolean {
    return this.authState === AuthState.LOGGED_IN;
  }

  public get isLoggedOut(): boolean {
    return this.authState === AuthState.LOGGED_OUT;
  }

  public get user$(): Observable<UserModel | null> {
    return this.authFacade.user$;
  }

  private authState: AuthState = AuthState.NOT_SET;
  private authStateSubscription?: Subscription;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authStateSubscription = this.authFacade.authState$.subscribe(
      (authState) => (this.authState = authState)
    );
  }

  ngOnDestroy(): void {
    this.authStateSubscription?.unsubscribe();
  }

  logout() {
    this.authFacade.logout();
  }
}
