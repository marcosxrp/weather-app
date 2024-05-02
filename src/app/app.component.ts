import { Component} from '@angular/core';
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
  class = 'sunny'

  constructor() {
  }

  getBackground(){
    switch(this.class){
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
    if(this.class == 'sunny'){
      this.class = 'rainy'
    }else if(this.class === 'rainy'){
      this.class = 'night'
    }else if(this.class === 'night'){
      this.class = 'storm'
    }else if(this.class === 'storm'){
      this.class = 'snowing'
    }else if(this.class === 'snowing'){
      this.class = 'cloudy'
    }else if(this.class === 'cloudy'){
      this.class = 'sunny'
    }
  }

}
