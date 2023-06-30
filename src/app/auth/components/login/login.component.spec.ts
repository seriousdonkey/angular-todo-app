import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthFacade } from '../../facade/auth.facade';
import { UiFacade } from '../../../ui/facade/ui.facade';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authFacade: AuthFacade;
  let uiFacade: UiFacade;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    authFacade = {
      errorMessage$: of(''),
    } as AuthFacade;
    uiFacade = {} as UiFacade;

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthFacade, useValue: authFacade },
        { provide: UiFacade, useValue: uiFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
