import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';

import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input()
  todos$!: Observable<Todo[]>;

  @Output()
  doUpdate = new EventEmitter<Todo>();

  @Output()
  doDelete = new EventEmitter<string>();

  async onChecked(todo: Todo) {
    const updatedTodo = { ...todo, done: !todo.done };
    this.doUpdate.emit(updatedTodo);
  }

  async onDelete(todoId: string | undefined) {
    if (todoId) {
      this.doDelete.emit(todoId);
    }
  }
}
