import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  

  public getStartDateForCalendar(selectedDate: Date) {

    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));


    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;


    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }
}
