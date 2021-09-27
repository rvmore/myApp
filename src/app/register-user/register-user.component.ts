import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  isFormSubmitted = false;
  greetUser = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setRegisterForm();

    this.registerForm
      .get('name')
      .valueChanges.subscribe(
        (value) => (this.greetUser = `Welcome ${value}!`)
      );
  }

  get hobbiesArray(): FormArray {
    return this.registerForm.get('hobbies') as FormArray;
  }

  setRegisterForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      dob: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
      // address: new FormGroup({
      //   street: new FormControl(''),
      //   city: new FormControl(''),
      //   pinCode: new FormControl(''),
      // }),
      // hobbies: new FormArray([new FormControl('')]),
    });
  }

  onSubmit(form): void {
    this.isFormSubmitted = true;

    if (form.valid) {
      this.userService.createUser(form.value).subscribe((user) => {
        console.log(user);
      });
    }
  }

  addNewHobby(): void {
    this.hobbiesArray.push(new FormControl(''));
  }

  removeHobbies(index): void {
    this.hobbiesArray.removeAt(index);
  }
}
