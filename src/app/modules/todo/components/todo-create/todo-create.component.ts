import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
})
export class TodoCreateComponent {
  @Output() doCreate = new EventEmitter<string>();

  todoCreateForm = new FormGroup({
    todoInput: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  async onCreateTodo() {
    const todoInput = this.todoCreateForm.value.todoInput;
    if (todoInput) {
      this.doCreate.emit(todoInput);
      this.todoCreateForm.reset();
    }
  }
}
