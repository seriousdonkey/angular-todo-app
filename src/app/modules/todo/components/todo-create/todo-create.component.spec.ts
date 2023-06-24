import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreateComponent } from './todo-create.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCreateComponent, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
