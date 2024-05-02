import { Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  class = signal('sunny');
  background = computed(() => `url(assets/${this.class()}_background.jpg)`)

  constructor() {
  }

  getBackground(){
    switch(this.class()){
      case "sunny": 
        return 'url(assets/sunny_background.jpg)'
      case "rainy": 
        return 'url(assets/rainy_background.jpg)'
      case "night": 
        return 'url(assets/night_background.jpg)'
      case "storm":
        return 'url(assets/storm_background.jpg)'
      case "snowing": 
        return 'url(assets/snowing_background.jpg)'
      case "cloudy": 
        return 'url(assets/cloudy_background.jpg)'
      default: 
        return 'url(assets/sunny_background.jpg)'
    }
  }

  changeBackground(){
    if(this.class() == 'sunny'){
      this.class.set('rainy')
    }else if(this.class() === 'rainy'){
      this.class.set('night')
    }else if(this.class() === 'night'){
      this.class.set('storm')
    }else if(this.class() === 'storm'){
      this.class.set('snowing')
    }else if(this.class() === 'snowing'){
      this.class.set('cloudy')
    }else if(this.class() === 'cloudy'){
      this.class.set('sunny')
    }
  }


}
