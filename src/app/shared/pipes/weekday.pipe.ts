import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday',
  standalone: true
})
export class WeekdayPipe implements PipeTransform {

  /**
   * transform the day number to thee weekday name
   * 
   * @param dayNumber 
   * @returns Weekday name
   */
  transform(dayNumber: number): string {
    const days: string[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    return days[dayNumber];
  }

}
