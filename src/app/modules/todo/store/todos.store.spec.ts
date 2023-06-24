import { TodosStore } from './todos.store';
import { TodoDataService } from '../services/todo-data.service';
import { AuthFacade } from '../../core/auth/facade/auth.facade';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';
import { UserModel } from '../../core/models/user.model';
import { cold } from 'jasmine-marbles';

class TodoDataServiceMock {
  todos: Todo[] = [];

  collection$(): Observable<Todo[]> {
    return of(this.todos);
  }
}
class AuthFacadeMock {
  public get user$(): Observable<UserModel | null> {
    return of({
      userId: 'some user id',
      displayName: 'some display name',
      email: 'some email',
    });
  }
}

describe('TodosStore', () => {
  it('should load todos', () => {
    const todoDataServiceMock = new TodoDataServiceMock();
    const todo = {
      userId: 'some user id',
      todo: 'some todo text',
      done: false,
      createdAt: new Date(),
    };
    todoDataServiceMock.todos = [todo];

    const authFacadeMock = new AuthFacadeMock();

    const store = new TodosStore(
      todoDataServiceMock as unknown as TodoDataService,
      authFacadeMock as AuthFacade
    );

    store.loadTodos();

    const expected = cold('a', {
      a: [todo],
    });
    expect(store.todos$).toBeObservable(expected);
  });

  describe('todos getter', () => {
    it('should return all todos', () => {
      const todoDataServiceMock = new TodoDataServiceMock();
      const todo = createTodo();

      const authFacadeMock = new AuthFacadeMock();

      const store = new TodosStore(
        todoDataServiceMock as unknown as TodoDataService,
        authFacadeMock as AuthFacade
      );
      const expected = cold('a', {
        a: [todo],
      });

      store.setState({ todos: [todo] });

      expect(store.todos$).toBeObservable(expected);
    });

    it('should return active todos only', () => {
      const todoDataServiceMock = new TodoDataServiceMock();
      const activeTodo = createTodo({ done: false });
      const completedTodo = createTodo({ done: true });

      const authFacadeMock = new AuthFacadeMock();

      const store = new TodosStore(
        todoDataServiceMock as unknown as TodoDataService,
        authFacadeMock as AuthFacade
      );
      const expected = cold('a', {
        a: [activeTodo],
      });

      store.setState({ todos: [activeTodo, completedTodo] });

      expect(store.activeTodos$).toBeObservable(expected);
    });

    it('should return completed todos only', () => {
      const todoDataServiceMock = new TodoDataServiceMock();
      const activeTodo = createTodo({ done: false });
      const completedTodo = createTodo({ done: true });

      const authFacadeMock = new AuthFacadeMock();

      const store = new TodosStore(
        todoDataServiceMock as unknown as TodoDataService,
        authFacadeMock as AuthFacade
      );
      const expected = cold('a', {
        a: [completedTodo],
      });

      store.setState({ todos: [activeTodo, completedTodo] });

      expect(store.completedTodos$).toBeObservable(expected);
    });
  });

  it('should create todo', () => {
    const todoDataServiceMock = jasmine.createSpyObj<TodoDataService>([
      'create',
    ]);
    const authFacadeMock = new AuthFacadeMock();

    const store = new TodosStore(
      todoDataServiceMock as unknown as TodoDataService,
      authFacadeMock as AuthFacade
    );

    store.createTodo('some todo');

    expect(todoDataServiceMock.create).toHaveBeenCalled();
  });

  it('should update todo', () => {
    const todoDataServiceMock = jasmine.createSpyObj<TodoDataService>([
      'update',
    ]);
    const authFacadeMock = new AuthFacadeMock();

    const store = new TodosStore(
      todoDataServiceMock as unknown as TodoDataService,
      authFacadeMock as AuthFacade
    );
    const todoId = 'some todo id';
    const todo = createTodo({ id: todoId });

    store.updateTodo(of(todo));

    expect(todoDataServiceMock.update).toHaveBeenCalledWith(todoId, todo);
  });

  it('should delete todo', () => {
    const todoDataServiceMock = jasmine.createSpyObj<TodoDataService>([
      'delete',
    ]);
    const authFacadeMock = new AuthFacadeMock();
    const store = new TodosStore(
      todoDataServiceMock,
      authFacadeMock as AuthFacade
    );
    const todoId = 'some todo id';

    store.deleteTodo(todoId);

    expect(todoDataServiceMock.delete).toHaveBeenCalledWith(todoId);
  });
});

function createTodo(params?: { id?: string; done?: boolean }): Todo {
  return {
    id: params?.id,
    userId: 'some user id',
    todo: 'some todo text',
    done: params?.done ?? false,
    createdAt: new Date(),
  };
}
