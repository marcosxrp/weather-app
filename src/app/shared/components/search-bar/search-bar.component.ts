import { Component, ElementRef, Signal, effect, inject, signal, viewChild} from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transformOrigin: 'left center',
        opacity: 1
      })),
      state('out', style({
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
  private searchInput = signal('') // Signal to hold the search input value.
  private debouncedSearchInput = this.debouncedSignal(this.searchInput, 1000);
  protected inputState = 'out';
  
  constructor(){
    /** 
     * Do a search each time the input signal changes.
    */
    effect(() => this.search())

    /**
     * Set the search input value to the latitude and longitude of the user's location.
     */
    effect(() => {
      // Check if both latitude and longitude are disponible
      if(this.weatherservice.latitude() && this.weatherservice.longitude()){
        // Set the search input value to the latitude and longitude of the user's location.
        this.searchInput.set(this.weatherservice.latitude() + ',' + this.weatherservice.longitude());
      }
    }, {allowSignalWrites: true})
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
  debouncedSignal<T>(
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
    if(this.debouncedSearchInput() !== '' && this.debouncedSearchInput().length > 3){
      // Call the placesSearch method of the weatherservice object, passing in the debounced search input value.
      this.weatherservice.placesSearch(this.debouncedSearchInput());
    }
  }
  
  /**
   * Toggle the state of the input element to animate it.
   */
  toggleInputState() {
    this.inputState = this.inputState === 'out' ? 'in' : 'out';
  }

}
