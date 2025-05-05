import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-financial-aid-dialog',
  templateUrl: './financial-aid-dialog.component.html',
  styleUrls: ['./financial-aid-dialog.component.css'],
})
export class FinancialAidDialogComponent {
  constructor(private dialogRef: MatDialogRef<FinancialAidDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
