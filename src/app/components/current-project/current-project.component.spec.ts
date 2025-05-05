import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProjectComponent } from './current-project.component';

describe('CurrentProjectComponent', () => {
  let component: CurrentProjectComponent;
  let fixture: ComponentFixture<CurrentProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
