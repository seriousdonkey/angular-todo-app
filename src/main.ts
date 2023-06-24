import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthEffects } from './app/modules/core/auth/effects/auth.effects';
import { LoginEffects } from './app/modules/core/auth/effects/login.effects';
import { RegisterEffects } from './app/modules/core/auth/effects/register.effects';
import { LogoutEffects } from './app/modules/core/auth/effects/logout.effects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(appRoutes),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      StoreModule.forRoot(reducers),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
      EffectsModule.forRoot([
        AuthEffects,
        LoginEffects,
        RegisterEffects,
        LogoutEffects,
      ])
    ),
  ],
}).catch((err) => console.error(err));
