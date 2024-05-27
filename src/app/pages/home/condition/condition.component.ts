import { Component, inject } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { HourlyConditionComponent } from './hourly-condition/hourly-condition.component';

@Component({
  selector: 'app-condition',
  standalone: true,
  imports: [HourlyConditionComponent],
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.css'
})
export class ConditionComponent {
  // injections
  protected weatherService = inject(WeatherService);

}
