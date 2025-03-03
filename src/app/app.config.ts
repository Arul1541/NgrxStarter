import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),provideEffects(UserEffects)]
};
