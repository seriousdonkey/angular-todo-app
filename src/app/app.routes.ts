import { Route } from '@angular/router';
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { LoginComponent } from './modules/auth/components/login/login.component';

export const appRoutes: Route[] = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'todo',
    loadChildren: () =>
      import('./modules/todo/todo.routes').then((m) => m.todoRoutes),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
