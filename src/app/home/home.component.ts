import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import {  loadUsers, updateUser, updateUsers } from '../state/user.actions';
import { selectError, selectUsers } from '../state/user.selectors';
import { User } from '../models/user.model';
import { debounceTime, filter, map } from 'rxjs';

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
  // userForm: FormGroup ;
  showForm: boolean= false;
  searchText: string = '';
  isEditing:boolean = false;

  constructor(private store: Store, private fb: FormBuilder) {
    this.form = this.fb.group({
      users: this.fb.array([])
    });
    // this.form = this.fb.group({
    //   id:new FormControl(''),
    //   name: new FormControl(''),
    //   username: new FormControl(''),
    //   email: new FormControl(''),
    //   phone: new FormControl(''),
    //   searchText: new FormControl('')
    // });
    // this.userForm = this.fb.group({
    //   name: new FormControl(''),
    //   username: new FormControl(''),
    //   email: new FormControl(''),
    //   phone: new FormControl('')
    // });

  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.users$.subscribe(users => {
      this.setUsers(users);
    });
  }
  setUsers(users: User[]): void {
    const userArray = this.getUsersFormArray();
    userArray.clear();
    users.forEach(user => {
      userArray.push(this.fb.group({
        name: new FormControl(user.name),
        username: new FormControl(user.username),
        email: new FormControl(user.email),
        phone: new FormControl(user.phone)
      }));
    });
    this.form.setControl('users',userArray)
  }


  formControlByName(name:string): FormControl {
    return this.form.get(name) as FormControl;
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

  editUser(): void {
    // this.editingUserId = user.id;
    // this.form.patchValue(user);
    this.isEditing=true
  }

  saveUser(): void {
    const updatedUsers = this.form.value.users;


    this.store.dispatch(updateUsers({ users: updatedUsers }));
    this.cancelEdit();
  }

  getUsersFormArray(): FormArray {
    return this.form.controls['users'] as FormArray;
  }

  cancelEdit(): void {
    this.editingUserId = null;
    this.isEditing=false

  }


}