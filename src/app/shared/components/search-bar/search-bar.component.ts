import { Component, ElementRef, Signal, WritableSignal, computed, effect, inject, signal, viewChild} from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { JsonPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [JsonPipe, DatePipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'scaleX(1)',
        transformOrigin: 'left center',
        opacity: 1
      })),
      state('out', style({
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        opacity: 0
      })),
      transition('in => out', animate('200ms ease-out')),
      transition('out => in', animate('200ms ease-in'))
    ])
  ]
})
export class SearchBarComponent {
  // Injections
  weatherservice = inject(WeatherService);

  // Variables
  private searchBar = viewChild<ElementRef>('searchBar');
  private searchInput: WritableSignal<string> = signal('') // Signal to hold the search input value.
  private debouncedSignal = this.debounceSignal(this.searchInput, 1000);
  protected inputState: string= 'out';
  
  constructor(){
    /** 
     * Do a search each time the input signal changes.
    */
    effect(() => this.search());
  }
  
  /**
 * Updates the search signal based on the input value.
 *
 * @param {HTMLInputElement} input - The input element containing the search value.
 */
  updateSearchSignal(input: HTMLInputElement) {
    // Set the search input value to the value of the input element.
    this.searchInput.set(input.value);
  }

  /**
 * Creates a debounced signal from the given source signal.
 *
 * @param sourceSignal - The source signal to debounce.
 * @param debounceTimeInMs - The debounce time in milliseconds. Defaults to 0.
 * @returns A debounced signal.
 */
  debounceSignal<T>(
    sourceSignal: Signal<T>,
    debounceTimeInMs: number = 0
  ): Signal<T>{
    // Create a new signal to hold the debounced value.
    const debounceSignal = signal(sourceSignal());

    // Use the `effect` hook to schedule a timeout that will update the debounced signal.
    effect(
      (onCleanup) => {
        // Get the current value of the source signal.
        const value = sourceSignal();

        // Schedule a timeout to update the debounced signal with the current value.
        const timeOut = setTimeout(
          () => debounceSignal.set(value), debounceTimeInMs
        );

        // Add a cleanup function to clear the timeout when the effect is cleaned up.
        onCleanup(() => clearTimeout(timeOut));
      },
      {allowSignalWrites: true}
    );

    // Return the debounced signal.
    return debounceSignal;
  }

  /**
 * This method is responsible for searching for cities based on the user's input.
 *
 * @return {void}
 */
  search() {
    // Check if the debounced search input value is not empty.
    if(this.debouncedSignal() !== '' && this.debouncedSignal().length > 3){
      // Call the placesSearch method of the weatherservice object, passing in the debounced search input value.
      this.weatherservice.placesSearch(this.debouncedSignal());
    }
  }
  
  /**
   * Toggle the state of the input element to animate it.
   */
  toggleInputState() {
    this.inputState = this.inputState === 'out' ? 'in' : 'out';
    if(this.inputState === 'in'){
      this.searchBar()?.nativeElement.focus();
    }
  }

}
