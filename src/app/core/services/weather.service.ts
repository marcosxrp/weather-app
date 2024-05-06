import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocationsModel } from '../models/locationsModel';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService{
  // Injections
  private http = inject(HttpClient);

  // Variables
  private userLanguage = signal('');
  public latitude: WritableSignal<number | null> = signal(null); // Signal to store the latitude
  public longitude: WritableSignal<number | null> = signal(null); // Signal to store the longitude
  public PlacesSearchResponse: WritableSignal<LocationsModel[] | null> = signal(null); // Signal to store the API places search response
  public selectedLocal: WritableSignal<LocationsModel | null> = signal(null); // Signal to store the selected local
  public showOptions: WritableSignal<boolean> = signal(false); // Signal to control the visibility of the options

  constructor() {
    this.getLocation() // Get user location on construct
    this.userLanguage.set(navigator.language.split('-')[0]);
  }

  /**
   * Get the user's location and perform the search.
   */
  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.placesSearch(position.coords.latitude + ',' + position.coords.longitude).pipe(
            take(1)
          ).subscribe(
              response => {
              let locations = response as LocationsModel[];
              let location = locations[0];
              this.selectLocal(location);
          });
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
    return this.http.get(`${environment.baseUrl}/search.json?key=${environment.apiKey}&q=${local}`).pipe(
      tap(response => {
        this.PlacesSearchResponse.set(response as LocationsModel[]);
        this.showOptions.set(true);
        console.log(response);
      })
    );
  }

  selectLocal(local: LocationsModel){
    this.selectedLocal.set(local);
    this.showOptions.set(false);
  }
}

