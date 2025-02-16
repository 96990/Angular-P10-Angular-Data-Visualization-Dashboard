import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, viewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ButtonModule, ButtonsModule } from "@progress/kendo-angular-buttons";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  task: string ='';
  tasks = new BehaviorSubject<string[]>([]);
  todoList$ = this.tasks.asObservable();
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required,Validators.minLength(2)]),
    userName: new FormControl('', [Validators.required,Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(2)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.minLength(2)]),
    roles: new FormArray([
      new FormControl()
    ]),
  });

  onSubmit(){
   console.log(this.signUpForm.value);
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
