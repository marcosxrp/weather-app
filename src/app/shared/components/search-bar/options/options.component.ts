import { Component, ElementRef, HostListener, Renderer2, effect, inject, input, viewChild} from '@angular/core';
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
  private renderer = inject(Renderer2);

  // Variables
  searchBar = input<HTMLInputElement>();
  options_div = viewChild<ElementRef>("options_div");

  constructor(){
    effect(() => {
      if(this.options_div() && this.searchBar()){
        this.renderer.setStyle(this.options_div()?.nativeElement, 'width', this.searchBar()?.offsetWidth + 'px')
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if(this.options_div() && this.searchBar()){
      this.renderer.setStyle(this.options_div()?.nativeElement, 'width', this.searchBar()?.offsetWidth + 'px');
    }
  }

  clicked(city: LocationsModel){
    this.weatherService.selectLocal(city);
    this.weatherService.forecastTimeSearch();
  }

}
