import { ComponentStore } from '@ngrx/component-store';
import { Todo } from '../models/todo.model';
import { EMPTY, Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { TodoDataService } from '../services/todo-data.service';
import { Injectable } from '@angular/core';
import { AuthFacade } from '../../auth/facade/auth.facade';
import { CategorieDataService } from '../services/categories-data.service';
import { Category } from '../models/category.model';
import { UiFacade } from '../../core/ui/facade/ui.facade';
import { SidebarItem } from '../../core/models/sidebar.model';

export interface TodosState {
  todos: Todo[];
  categories: Category[];
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  public get todos$(): Observable<Todo[]> {
    return this.select((state) => state.todos);
  }

  public get activeTodos$(): Observable<Todo[]> {
    return this.select((state) => state.todos.filter((todo) => !todo.done));
  }

  public get completedTodos$(): Observable<Todo[]> {
    return this.select((state) => state.todos.filter((todo) => todo.done));
  }

  constructor(
    private todoFirestore: TodoDataService,
    private categorieDataService: CategorieDataService,
    private authFacade: AuthFacade,
    private uiFacade: UiFacade
  ) {
    super({ todos: [], categories: [] });
  }

  readonly addTodos = this.updater((state, todos: Todo[]) => ({
    ...state,
    todos: todos,
  }));

  readonly loadTodos = this.effect<void>((trigger$) => {
    return combineLatest([this.authFacade.user$, trigger$]).pipe(
      switchMap(([user]) => {
        if (user) {
          return this.todoFirestore.collection$((ref) =>
            ref.where('userId', '==', user.userId).orderBy('done')
          );
        } else {
          // TODO: handle error
          return EMPTY;
        }
      }),
      map((todos) => this.addTodos(todos))
    );
  });

  readonly loadCategories = this.effect<void>((trigger$) => {
    return combineLatest([this.authFacade.user$, trigger$]).pipe(
      switchMap(([user]) => {
        if (user) {
          return this.categorieDataService.collection$((ref) =>
            ref.where('userId', '==', user.userId)
          );
        } else {
          return EMPTY;
        }
      }),
      map((categories) => {
        return categories.map((cat) => {
          const sidebarItem: SidebarItem = {
            title: cat.name,
            route: '',
          };
          return sidebarItem;
        });
      }),
      tap((sidebarItems) => this.uiFacade.addMenu('Categories', sidebarItems))
    );
  });

  readonly createTodo = this.effect((todoInput$: Observable<string>) => {
    return combineLatest([this.authFacade.user$, todoInput$]).pipe(
      map(([user, input]) => {
        if (user) {
          const newTodo: Todo = {
            todo: input,
            done: false,
            userId: user.userId,
            createdAt: new Date(),
          };
          return newTodo;
        } else {
          // TODO: handle this case
          return undefined;
        }
      }),
      map((newTodo) => {
        if (newTodo) {
          this.todoFirestore.create(newTodo);
        }
      })
    );
  });

  readonly updateTodo = this.effect((todo$: Observable<Todo>) => {
    return todo$.pipe(
      map((todo) => {
        if (todo.id) {
          this.todoFirestore.update(todo.id, todo);
        }
      })
    );
  });

  readonly deleteTodo = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      map((id) => {
        this.todoFirestore.delete(id);
      })
    );
  });
}
