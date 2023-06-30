import { FirestoreService } from '../../../services/firestore.service';
import { Todo } from '../models/todo.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoDataService extends FirestoreService<Todo> {
  path = 'todo';
}
