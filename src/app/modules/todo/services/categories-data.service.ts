import { Injectable } from '@angular/core';
import { FirestoreService } from '../../core/services/firestore.service';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategorieDataService extends FirestoreService<Category> {
  protected override path = 'categories';
}
