import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the button when disabled = true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    expect(button.disabled).toBeTrue();
    expect(button.classList).toContain('btn-disabled');
  });

  it('should enable the button initial', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    expect(button.disabled).toBeFalse();
    expect(button.classList).toContain('btn');
  });

  it('should set button type = submit', () => {
    component.type = 'submit';
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    expect(button.type).toBe('submit');
  });

  it('should set default button type = button', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    expect(button.type).toBe('button');
  });
});
