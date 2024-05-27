import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-hourly-condition',
  standalone: true,
  imports: [],
  templateUrl: './hourly-condition.component.html',
  styleUrl: './hourly-condition.component.css'
})
export class HourlyConditionComponent {

  // variables
  iconUrl = input.required<string>();
  temp = input.required<string>();
  rainChance = input.required<string>();
  hour = input.required<number>();
  padStartHour = computed(() => this.hour().toString().padStart(2, '0'))

}
