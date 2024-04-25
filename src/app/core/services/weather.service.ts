import { Injectable, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, debounceTime, distinctUntilChanged, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit{
  // Injections
/*   private http = inject(HttpClient);
 */
  // Variables
  private latitude: WritableSignal<number | null> = signal(null);
  private longitude: WritableSignal<number | null> = signal(null);
  public input = signal('');

  constructor() {}



  ngOnInit(){
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude.set(position.coords.latitude);
          this.longitude.set(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  /* searchCities(input: WritableSignal<string>){
    this.http.get(`${environment.baseUrl}/search.json?key=${environment.apiKey}&q=${input}`).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      catchError(
        error => {
          console.error('Error: ', error);
          return throwError(() => new Error('Something went wrong!'))
        }
      )
    ).subscribe(response => console.log(response))
  } */
}
