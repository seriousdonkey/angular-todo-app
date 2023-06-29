import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit checked event', () => {
    const todo = {} as Todo;
    component.todo = todo;
    spyOn(component.todoChecked, 'emit');

    component.onCheck();

    expect(component.todoChecked.emit).toHaveBeenCalledWith(todo);
  });

  it('should emit delete event', () => {
    const todo = { id: 'some todo id' } as Todo;
    component.todo = todo;
    spyOn(component.todoDeleted, 'emit');

    component.onDelete();

    expect(component.todoDeleted.emit).toHaveBeenCalledWith(todo.id);
  });
});
