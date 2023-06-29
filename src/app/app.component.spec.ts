import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationComponent } from './modules/core/layout/navigation/navigation.component';
import { ContentComponent } from './modules/core/layout/content/content.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AuthState } from './modules/auth/auth.reducer';
import { AuthFacade } from './modules/auth/facade/auth.facade';

describe('AppComponent', () => {
  let authFacade: AuthFacade;

  beforeEach(async () => {
    authFacade = {
      authState$: of(AuthState.NOT_SET),
    } as AuthFacade;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AuthFacade, useValue: authFacade }],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [NavigationComponent, ContentComponent] },
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display navigation component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const navigationComponent = fixture.debugElement.query(
      By.css('app-navigation')
    );
    expect(navigationComponent).toBeTruthy();
  });

  it('should display content component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const contentComponent = fixture.debugElement.query(By.css('app-content'));
    expect(contentComponent).toBeTruthy();
  });
});
