import { Component, OnInit } from '@angular/core';
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
import { environment } from '../../../environments/environment.development';
import { UserProfile } from '../../services/auth-service/UserProfile';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user: UserProfile | null = null;
  public isLoading: boolean = true;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    this.profileForm = this.fb.group({
      fullName: '',
      role: '',
      password: ['', [Validators.minLength(6)]],
    });

    if (!this.user) {
      this.isLoading = true;
      setTimeout(() => {
        this.fetchUserDetails();
        this.isLoading = false;
      }, 1000);
    }
  }

  public fetchUserDetails() {
    this.http
      .get<UserProfile>(`${environment.backendHost}/auth/user`)
      .subscribe({
        next: (profile: any) => {
          this.user = profile;
        },
        error: (err) => {
          console.error('Failed to fetch user profile:', err);
        },
      });
  }

  updateProfile(): void {
    let fullName = this.profileForm.value.fullName;
    let functionality = this.profileForm.value.role;
    let password = this.profileForm.value.password;

    this.profileService.updateProfile(fullName, password, functionality).subscribe({
      next: (data) => {
        console.log('update Successful:', data);
        this.toastr.success('Profile updated successfully.', '', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
        });
        this.fetchUserDetails();
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
