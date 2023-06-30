import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreateComponent } from './todo-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCreateComponent, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('create form', () => {
    it('should display', () => {
      const form: HTMLFormElement = fixture.debugElement.query(
        By.css('form')
      ).nativeElement;

      expect(form).toBeTruthy();
    });

    it('should contain control for todoInput', () => {
      const contains = component.todoCreateForm.contains('todoInput');

      expect(contains).toBeTrue();
    });

    describe('submit', () => {
      it('should be invalid if input is empty', () => {
        const isValid = component.todoCreateForm.valid;

        expect(isValid).toBeFalse();
      });

      it('should be valid if input is not empty', () => {
        component.todoCreateForm.controls.todoInput.setValue('some todo');

        const isValid = component.todoCreateForm.valid;

        expect(isValid).toBeTrue();
      });

      it('should emit create event', () => {
        component.todoCreateForm.controls.todoInput.setValue('some todo');
        spyOn(component.doCreate, 'emit');
        const form: HTMLFormElement = fixture.debugElement.query(
          By.css('form')
        ).nativeElement;

        form.requestSubmit();

        expect(component.doCreate.emit).toHaveBeenCalledWith('some todo');
      });
    });
  });

  describe('todo input element', () => {
    it('should display element', () => {
      const element: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;

      expect(element).toBeTruthy();
      expect(element.type).toEqual('text');
      expect(element.placeholder).toEqual('Enter new todo...');
      expect(element.getAttribute('formControlName')).toBe('todoInput');
    });
  });
});
