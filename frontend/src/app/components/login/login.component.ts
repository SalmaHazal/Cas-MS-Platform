import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        console.log('Login Successful:', data);
        this.authService.isAuthenticated = true;
        this.authService.loadProfile(data);
        this.toastr.success('Logged In successfully.', '', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
        });
        this.router.navigateByUrl('/admin');
      },
      error: (err) => {
        console.error('Login Error:', err);
        if (err.status === 404) {
          this.toastr.error('User not found. Please check your email.', '', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
          });
        } else if (err.status === 401) {
          this.toastr.error('Incorrect password. Please try again.', '', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
          });
        } else {
          this.toastr.error('An error occurred. Please try again later.', '', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
          });
        }
      },
    });
  }
}
