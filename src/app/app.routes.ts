import { Route } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';

export const appRoutes: Route[] = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'todo',
    loadChildren: () =>
      import('./pages/todo/todo.routes').then((m) => m.todoRoutes),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
