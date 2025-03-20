import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from '../state/user.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      tap(() => console.log('Effect triggered : loadUsers')), 
      mergeMap(() =>
        this.userService.getUsers().pipe(
          tap(users => console.log('Users data fetched:', users)), 
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => {
            console.error('ERROR API:', error); 
            return of(UserActions.loadUsersFailure({ error: error.message }));
          })
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      tap(() => console.log('Effect triggered : updateUser')), 
      mergeMap(action =>
        this.userService.updateUser(action.user).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );
  updateUsers$ = createEffect(()=>
  this.actions$.pipe(
    ofType(UserActions.updateUsers),
    mergeMap(action =>
        this.userService.updateUser(action.users).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  )
  

}
