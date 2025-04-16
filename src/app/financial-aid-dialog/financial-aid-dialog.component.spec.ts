import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAidDialogComponent } from './financial-aid-dialog.component';

describe('FinancialAidDialogComponent', () => {
  let component: FinancialAidDialogComponent;
  let fixture: ComponentFixture<FinancialAidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialAidDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialAidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
