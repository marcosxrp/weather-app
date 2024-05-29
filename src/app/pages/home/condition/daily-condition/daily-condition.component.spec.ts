import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyConditionComponent } from './daily-condition.component';

describe('DailyConditionComponent', () => {
  let component: DailyConditionComponent;
  let fixture: ComponentFixture<DailyConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyConditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
