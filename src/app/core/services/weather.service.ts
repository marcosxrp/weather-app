import { Injectable, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocationsModel } from '../models/locationsModel';

@Injectable({
  providedIn: 'root'
})
export class WeatherService{
  // Injections
  private http = inject(HttpClient);

  // Variables
  private latitude: WritableSignal<number | null> = signal(null); // Signal to store the latitude
  private longitude: WritableSignal<number | null> = signal(null); // Signal to store the longitude
  public response: WritableSignal<LocationsModel[] | null> = signal(null); // Signal to store the API response

  constructor() {
    this.getLocation() // Get user location on construct
  }

  /**
   * Get the user's location.
   */
  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude.set(position.coords.latitude); // Set the latitude signal
          this.longitude.set(position.coords.longitude); // Set the longitude signal
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  /**
   * Perform a place search using the provided location.
   *
   * @param local - The location to search for.
   */
  placesSearch(local: string){
    this.http.get(`${environment.baseUrl}/search.json?key=${environment.apiKey}&q=${local}`)
    .subscribe(response => console.log(response)); // Log the API response
  }
}

