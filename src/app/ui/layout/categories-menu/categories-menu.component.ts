import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFacade } from 'src/app/facade/todo.facade';
import { Observable } from 'rxjs';
import { Category } from 'src/app/pages/todo/models/category.model';

@Component({
  selector: 'app-categories-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
})
export class CategoriesMenuComponent {
  public get categories$(): Observable<Category[]> {
    return this.todoFacade.categories$;
  }

  constructor(private todoFacade: TodoFacade) {}
}
