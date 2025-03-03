import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {HomeModule} from "./home/home.module";
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { UserEffects } from './state/user.effects';
import { userReducer } from './state/user.reducer';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot( {users: userReducer}),
    EffectsModule.forRoot([UserEffects]),
    HomeModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
