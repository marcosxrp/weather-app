import { Component, inject } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather.service';
import { WeekdayPipe } from '../../../../shared/pipes/weekday.pipe';

@Component({
  selector: 'app-daily-condition',
  standalone: true,
  imports: [WeekdayPipe],
  templateUrl: './daily-condition.component.html',
  styleUrl: './daily-condition.component.css'
})
export class DailyConditionComponent {
  // injections
  protected weatherService = inject(WeatherService);

  // variables
  protected thisDay: number = new Date().getDay();
}
