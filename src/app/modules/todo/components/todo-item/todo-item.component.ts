import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, CheckboxModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  todo: Todo | undefined;

  @Output()
  todoChecked = new EventEmitter<Todo>();
  @Output()
  todoDeleted = new EventEmitter<string>();

  checked = true;

  onCheck() {
    if (this.todo) {
      this.todoChecked.emit(this.todo);
    }
  }

  onDelete() {
    if (this.todo) {
      this.todoDeleted.emit(this.todo.id);
    }
  }
}
