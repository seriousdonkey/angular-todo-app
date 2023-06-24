import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { TodosStore } from './store/todos.store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  const todoStoreMock = jasmine.createSpyObj('TodosStore', [
    'addTodo',
    'loadTodos',
    'createTodo',
    'updateTodo',
    'deleteTodo',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    TestBed.overrideProvider(TodosStore, { useValue: todoStoreMock });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
