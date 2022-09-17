import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        const remeberEmail = this.loginForm.controls['remember'].value || false;
        if (remeberEmail) {
          localStorage.setItem('email', remeberEmail);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigate(['/']);
      },
      error: ({ error }) => {
        Swal.fire('Error', error.message, 'error');
      },
    });
  }
}
