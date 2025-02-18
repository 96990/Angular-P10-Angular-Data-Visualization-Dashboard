import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ButtonModule, ButtonsModule } from "@progress/kendo-angular-buttons";
import { NotificationComponent } from '../shared/notification/notification.component';
@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule, ReactiveFormsModule, ButtonModule, NotificationComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {
  task: string ='';
  tasks = new BehaviorSubject<string[]>([]);
  todoList$ = this.tasks.asObservable();
  @ViewChild('notification') notify!: NotificationComponent;

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required,Validators.minLength(3)]),
    userName: new FormControl('', [Validators.required,Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(3)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.minLength(3)]),
    roles: new FormArray([ new FormControl('')]),
  });

  get roles(): FormArray{
    return this.signUpForm.get('roles') as FormArray;
  }

  get rolesArray() {
    return this.roles.controls.map((control, index) => ({control, index}));
  }

  addItem(){
    this.roles.push(new FormControl(''));
  }

  removeItem(index: number){
    this.roles.removeAt(index);
  }

  onSubmit(){
   console.log(this.signUpForm.value);
   const user = JSON.stringify(this.signUpForm.value);
   localStorage.setItem("user",user);
   this.notify.showNotification('signup');
   this.signUpForm.reset();
  }
  onAddRoles(){
    const updatedList = [...this.tasks.value, this.task];
    this.tasks.next(updatedList);
    this.task = '';
  }
  onDelete(index: any){
    const updatedList = this.tasks.value.filter((val,idx) =>  idx !== index);
    this.tasks.next(updatedList);
  }
}
