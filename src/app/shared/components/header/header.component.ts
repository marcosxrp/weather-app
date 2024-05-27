import { Component, computed, inject, signal } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { WeatherService } from '../../../core/services/weather.service';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Injections
  weatherservice = inject(WeatherService);

  // Variables
  protected date = signal(new Date());
  protected newDate = computed(() => this.date().toLocaleString('en-US', {timeZone: this.weatherservice.forecastTimeResponse()?.location['tz_id']}))

  constructor() {
    this.date.set(new Date());
    console.log(this.date())
    setInterval(() => this.date.set(new Date()), 1000);
  }
}
