import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Todo } from '../../models/todo.model';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list', () => {
    const list = fixture.debugElement.query(By.css('ul')).nativeElement;

    expect(list).toBeTruthy();
  });

  it('should display list item', () => {
    component.todos$ = of([createTodo()]);
    fixture.detectChanges();

    const todoItem: TodoListComponent = fixture.debugElement.query(
      By.css('app-todo-item')
    ).componentInstance;

    expect(todoItem).toBeTruthy();
  });

  it('should display multiple list items', () => {
    component.todos$ = of([createTodo(), createTodo()]);
    fixture.detectChanges();

    const todoItems = fixture.debugElement.queryAll(By.css('app-todo-item'));

    expect(todoItems.length).toBe(2);
  });

  it('should display empty list', () => {
    const todoItem = fixture.debugElement.query(By.css('app-todo-item'));

    expect(todoItem).toBeFalsy();
  });

  it('should emit update event', () => {
    const todo = createTodo({ done: false });
    const updatedTodo = createTodo({ done: true });
    spyOn(component.doUpdate, 'emit');

    component.onChecked(todo);

    expect(component.doUpdate.emit).toHaveBeenCalledWith(updatedTodo);
  });

  it('should emit delete event', () => {
    const todoId = 'some todo id';
    spyOn(component.doDelete, 'emit');

    component.onDelete(todoId);

    expect(component.doDelete.emit).toHaveBeenCalledWith(todoId);
  });
});

function createTodo(params?: { done?: boolean }): Todo {
  return {
    todo: 'some todo',
    done: params?.done ?? false,
    userId: 'some user id',
    createdAt: new Date(),
  };
}
