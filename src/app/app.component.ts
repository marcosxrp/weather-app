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
  // Variables
  class = signal('snowing');
  background = computed(() => `url(assets/${this.class()}_background.jpg)`)

  constructor() {
  }

}
