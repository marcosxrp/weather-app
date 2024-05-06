import { Component, inject, signal } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  // Injections
  protected weatherService = inject(WeatherService);

  // Variables

}
