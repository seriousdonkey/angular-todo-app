import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputComponent],
    });
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display input element', () => {
    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    expect(input).toBeTruthy();
  });

  describe('input types', () => {
    const testcases: { type: 'text' | 'email' | 'password' }[] = [
      { type: 'text' },
      { type: 'email' },
      { type: 'password' },
    ];

    testcases.forEach((testcase) => {
      it(`input type should be ${testcase.type}`, () => {
        component.inputType = testcase.type;
        fixture.detectChanges();

        const input: HTMLInputElement = fixture.debugElement.query(
          By.css('input')
        ).nativeElement;

        expect(input.type).toBe(testcase.type);
      });
    });
  });

  it('should display label', () => {
    component.label = 'Some Label';
    fixture.detectChanges();

    const label: HTMLLabelElement = fixture.debugElement.query(
      By.css('label')
    ).nativeElement;

    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Some Label');
  });

  it('should be disabled', () => {
    component.setDisabledState?.(true);
    fixture.detectChanges();

    expect(component.disabled).toBeTrue();
  });
});
