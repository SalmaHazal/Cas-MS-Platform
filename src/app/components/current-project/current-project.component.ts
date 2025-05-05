import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faBullseye,
  faBook,
  faDollarSign,
  faGift,
  faShoePrints,
  faTshirt,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DonateDialogComponent } from '../donate-dialog/donate-dialog.component';
import { FinancialAidDialogComponent } from './../financial-aid-dialog/financial-aid-dialog.component';

@Component({
  selector: 'app-current-project',
  imports: [FontAwesomeModule],
  templateUrl: './current-project.component.html',
  styleUrl: './current-project.component.css',
})
export class CurrentProjectComponent {
  constructor(private dialog: MatDialog) {}

  openDonateDialog(): void {
    this.dialog.open(DonateDialogComponent, {
      width: '400px',
    });
  }

  openFinancialAidDialog(): void {
    this.dialog.open(FinancialAidDialogComponent, {
      width: '400px',
    });
  }

  faCalendarAlt = faCalendarAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  faBullseye = faBullseye;
  faBook = faBook;
  faDollarSign = faDollarSign;
  faGift = faGift;
  faShoePrints = faShoePrints;
  faTshirt = faTshirt;
}
