import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyConditionComponent } from './hourly-condition.component';

describe('HourlyConditionComponent', () => {
  let component: HourlyConditionComponent;
  let fixture: ComponentFixture<HourlyConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyConditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourlyConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
