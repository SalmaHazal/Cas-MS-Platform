import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-donate-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './donate-dialog.component.html',
  styleUrl: './donate-dialog.component.css',
})
export class DonateDialogComponent {
  donationForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DonateDialogComponent>,
    private fb: FormBuilder
  ) {
    this.donationForm = this.fb.group({
      phone: ['', Validators.required],
      location: ['', Validators.required],
      availability: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.donationForm.valid) {
      this.dialogRef.close(this.donationForm.value);
    }
  }
}
