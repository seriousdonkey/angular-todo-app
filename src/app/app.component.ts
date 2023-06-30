import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './ui/layout/navigation/navigation.component';
import { ContentComponent } from './ui/layout/content/content.component';
import { SidebarComponent } from './ui/layout/sidebar/sidebar.component';
import { AuthFacade } from './auth/facade/auth.facade';
import { AuthState } from './auth/auth.reducer';
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
