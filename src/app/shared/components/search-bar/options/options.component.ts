import { Component, inject} from '@angular/core';
import { WeatherService } from '../../../../core/services/weather.service';
import { JsonPipe } from '@angular/common';
import { LocationsModel } from '../../../../core/models/locationsModel';

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

  clicked(city: LocationsModel){
    this.weatherService.selectLocal(city);
    this.weatherService.forecastTimeSearch();
  }

}
