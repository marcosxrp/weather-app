import { Component, computed, inject, signal } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { WeatherService } from '../../../core/services/weather.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Injections
  weatherservice = inject(WeatherService);

  // Variables
  protected date = signal(new Date());
  private timeZone = signal('America/Bahia');
  protected localeTime = computed(() => this.date().toLocaleTimeString('br', { timeZone: `${this.timeZone()}` }));
  protected localeDate = computed(() => this.date().toLocaleDateString('br', { timeZone: `${this.timeZone()}` }));

  constructor() {
    this.date.set(new Date());
    setInterval(() => this.date.set(new Date()));
  }
}
