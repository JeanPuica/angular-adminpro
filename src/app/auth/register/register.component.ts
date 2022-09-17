import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errMessage = '';

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  registerUser() {
    this.errMessage = '';

    if (!this.validatePasswords()) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: ({ error }) => {
        Swal.fire('Error', error.message, 'error');
      },
    });
  }

  validatePasswords() {
    const pass1 = this.registerForm.controls['password'].value;
    const pass2 = this.registerForm.controls['password2'].value;

    if (pass1 !== pass2) {
      this.errMessage = 'Las contraseñas deben ser iguales';
      return false;
    }

    return true;
  }
}
