import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { TodosStore } from './store/todos.store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './models/todo.model';
import { TodoListComponent } from './components/todo-list/todo-list.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  const todosSubject = new BehaviorSubject<Todo[]>([]);

  const todoStoreMock: jasmine.SpyObj<TodosStore> = jasmine.createSpyObj(
    'TodosStore',
    ['addTodo', 'loadTodos', 'createTodo', 'updateTodo', 'deleteTodo'],
    { todos$: todosSubject.asObservable() }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    TestBed.overrideProvider(TodosStore, { useValue: todoStoreMock });
  });

  beforeEach(() => {
    todosSubject.next([]);

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initial load todos', () => {
    expect(todoStoreMock.loadTodos).toHaveBeenCalled();
  });

  it('should create todo', () => {
    const createComponent: TodoCreateComponent = fixture.debugElement.query(
      By.css('app-todo-create')
    ).componentInstance;
    createComponent.doCreate.emit('some todo');

    expect(todoStoreMock.createTodo).toHaveBeenCalledOnceWith('some todo');
  });

  it('should update todo', () => {
    const todo = {} as Todo;
    todosSubject.next([todo]);
    fixture.detectChanges();
    const list: TodoListComponent = fixture.debugElement.query(
      By.css('app-todo-list')
    ).componentInstance;

    list.doUpdate.emit(todo);

    expect(todoStoreMock.updateTodo).toHaveBeenCalledWith(todo);
  });

  it('should delete todo', () => {
    const id = 'some todo id';
    const todo = { id } as Todo;
    todosSubject.next([todo]);
    fixture.detectChanges();
    const list: TodoListComponent = fixture.debugElement.query(
      By.css('app-todo-list')
    ).componentInstance;

    list.doDelete.emit(id);

    expect(todoStoreMock.deleteTodo).toHaveBeenCalledWith(id);
  });
});
