import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProfileService } from '../../services/profile-service/profile-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule],
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: '',
      password: ['', [Validators.minLength(6)]],
    });
  }

  updateProfile(): void {
    let fullName = this.profileForm.value.fullName;
    let password = this.profileForm.value.password;

    this.profileService.updateProfile(fullName, password).subscribe({
      next: (data) => {
        console.log('update Successful:', data);
        this.toastr.success('Profile updated successfully.', '', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
        });
      },
      error: (err) => {
        console.error('update Error:', err);
        if (err.status === 404) {
          this.toastr.error('User not found. Please check your email.', '', {
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
