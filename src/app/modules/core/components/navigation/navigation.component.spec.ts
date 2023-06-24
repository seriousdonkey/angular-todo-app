import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { AuthFacade } from '../../auth/facade/auth.facade';
import { of } from 'rxjs';
import { AuthState } from '../../auth/auth.reducer';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let authFacade: AuthFacade;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    authFacade = {
      authState$: of(AuthState.NOT_SET),
    } as AuthFacade;

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [{ provide: AuthFacade, useValue: authFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
