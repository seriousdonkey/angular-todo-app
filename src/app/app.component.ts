import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './modules/core/layout/navigation/navigation.component';
import { ContentComponent } from './modules/core/layout/content/content.component';
import { SidebarComponent } from './modules/core/layout/sidebar/sidebar.component';
import { AuthFacade } from './modules/auth/facade/auth.facade';
import { AuthState } from './modules/auth/auth.reducer';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    SidebarComponent,
    ContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public get isLoggedIn(): boolean {
    return this.authState === AuthState.LOGGED_IN;
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
}
