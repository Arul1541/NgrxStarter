import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadUsers, updateUser } from '../state/user.actions';
import { selectError, selectUsers } from '../state/user.selectors';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users$ = this.store.select(selectUsers);
  error$ = this.store.select(selectError);
  editingUserId: number | null = null; 
  form: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.form = this.fb.group({
      id:new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }


  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get usernameControl(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get phoneControl():FormControl {
    return this.form.get('phone') as FormControl;
  }

  editUser(user: User): void {
    this.editingUserId = user.id; 
    this.form.patchValue(user); 
  }

  saveUser(user: User): void {
    const updatedUser: User = {
      ...user,
      name: this.nameControl.value,
      username: this.usernameControl.value,
      email: this.emailControl.value,
      phone: this.phoneControl.value
    };

    this.store.dispatch(updateUser({ user: updatedUser }));
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingUserId = null; 
  }

}
