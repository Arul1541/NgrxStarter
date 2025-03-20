import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());
export const updateUser = createAction('[User] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: string }>());

export const updateUsers = createAction('[User] updated all users',props<{users:User}>());
export const updateUsersSuccess = createAction('[Users] Update All User Success', props<{ users: User[] }>());
export const updateUsersFailure = createAction('[Users] Update All User Failure', props<{ error: string }>());