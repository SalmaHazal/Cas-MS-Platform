import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsSectionComponent } from './sponsors-section.component';

describe('SponsorsSectionComponent', () => {
  let component: SponsorsSectionComponent;
  let fixture: ComponentFixture<SponsorsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
