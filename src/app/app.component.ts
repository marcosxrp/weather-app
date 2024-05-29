import { Component, computed, effect, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './core/services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  // Injections
  private weatherService = inject(WeatherService);

  // Variables
  weatherName = signal('sunny');
  background = computed(() => `url(assets/${this.weatherName()}_background.jpg)`);

  
  constructor() {
    // Set the background image
    effect(() => {
      switch(this.weatherService.forecastTimeResponse()?.current?.condition?.code){
      case 1030:
      case 1063:
      case 1066:
      case 1069:
      case 1072:
      case 1087:  
      case 1135:
        this.weatherName.set('sunny');
        break;
      case 1003:
      case 1006:
      case 1009: 
        this.weatherName.set('cloudy');
        break;
      case 1150:
      case 1153:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1240:
      case 1243: 
        this.weatherName.set('rainy');
        break;
      case 1114:
      case 1117:
      case 1168:
      case 1171:
      case 1198:
      case 1201:
      case 1204:
      case 1207:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
      case 1249:
      case 1252:
      case 1255:
      case 1258:
      case 1261:
      case 1264:     
        this.weatherName.set('snowing');
        break;
      case 1246:
      case 1273:
      case 1276:
      case 1279:
      case 1282:
        this.weatherName.set('storm');
        break;
      default:
        this.isDay() ? this.weatherName.set('sunny') : this.weatherName.set('night');
        break;
      }
    }, {allowSignalWrites: true})
  }

  isDay() {
    return this.weatherService.forecastTimeResponse()?.current?.is_day === 1;
  }

}
