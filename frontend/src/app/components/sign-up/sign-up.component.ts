import { AuthService } from '../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  profilePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        question: ['', [Validators.required]],
        functionality: ['', [Validators.required]],
        profilePicture: [null, Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.signUpForm.patchValue({ profilePicture: file });
      this.signUpForm.get('profilePicture')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  signUp(): void {
    let fullName = this.signUpForm.value.fullName;
    let email = this.signUpForm.value.email;
    let password = this.signUpForm.value.password;
    let gender = this.signUpForm.value.gender;
    let question = this.signUpForm.value.question;
    let functionality = this.signUpForm.value.functionality;
    let profilePicture = this.signUpForm.value.profilePicture;

    this.authService
      .register(fullName, email, password, gender, question, functionality, profilePicture)
      .subscribe({
        next: (data) => {
          console.log('Registration Successful:', data);
          this.toastr.success(
            'Account created successfully! Please log in.',
            '',
            {
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
            }
          );
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.error('Registration Error:', err);
          if (err.status === 409) {
            this.toastr.error('Email already in use.', '', {
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
            });
          } else {
            this.toastr.error(
              'An error occurred. Please try again later.',
              '',
              {
                timeOut: 5000,
                progressBar: true,
                closeButton: true,
              }
            );
          }
        },
      });
  }
}
