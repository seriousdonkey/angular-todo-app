import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';
import { TodosStore } from './store/todos.store';

import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TodoCreateComponent,
    TodoListComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodosStore],
})
export class TodoComponent implements OnInit {
  public get todos$(): Observable<Todo[]> {
    return this.store.todos$;
  }

  public get activeTodos$(): Observable<Todo[]> {
    return this.store.activeTodos$;
  }

  public get completedTodos$(): Observable<Todo[]> {
    return this.store.completedTodos$;
  }

  constructor(private store: TodosStore) {}

  ngOnInit(): void {
    this.store.loadTodos();
  }

  onCreate(todo: string) {
    this.store.createTodo(todo);
  }

  onUpdate(todo: Todo) {
    this.store.updateTodo(todo);
  }

  onDelete(id: string) {
    this.store.deleteTodo(id);
  }
}
