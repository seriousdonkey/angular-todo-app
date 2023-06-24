import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthFacade } from '../../auth/facade/auth.facade';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let authFacade: AuthFacade;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    authFacade = {
      errorMessage$: of(''),
    } as AuthFacade;

    await TestBed.configureTestingModule({
      imports: [SignupComponent, ReactiveFormsModule],
      providers: [{ provide: AuthFacade, useValue: authFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
