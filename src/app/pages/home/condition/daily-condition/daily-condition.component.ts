import { Component, inject } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather.service';

@Component({
  selector: 'app-daily-condition',
  standalone: true,
  imports: [],
  templateUrl: './daily-condition.component.html',
  styleUrl: './daily-condition.component.css'
})
export class DailyConditionComponent {
  // injections
  protected weatherService = inject(WeatherService);
}
