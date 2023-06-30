import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Category } from '../pages/todo/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategorieDataService extends FirestoreService<Category> {
  protected override path = 'categories';
}
