import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../state/user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  // user reducers
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true
  })),
  

  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // update user reducers

  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((existUser) => (existUser.id === user.id ? user : existUser))
  })),

  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
