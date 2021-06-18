import { Component, DoCheck, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CalendarDay } from '../shared/calendarDays';
import { CalendarService } from '../shared/calendar.service';
import { Router } from '@angular/router';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {
  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays: any = [];
    let weekDays: any = [];
    calendarDaysArray.map((day: any, index: any) => {
      weekDays.push(day);
      if (++index % chunkSize === 0) {
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });
    return calendarDays;
  }
}


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit, DoCheck {
  public redir: any
  public div: any;
  public test = false;
  public namesDay = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"]
  public calendar: CalendarDay[] | undefined = [];
  public monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  public displayMonth: string | undefined;
  private monthIndex: number = 0;

  constructor(private service: CalendarService, private rout: Router) { }
  ngDoCheck() {


  }

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    this.div = document.getElementById('pop')
  }

  public popup(event: any) {
    this.test = true
    if (this.test) {
      event.target.className = "popup"
      event.target.append(this.div);
    }
    this.rout.navigate(['/re'])
  }
  public close() {
    this.rout.navigate(['/calendar'])
    this.test = false
    console.log(this.test)
    let clear = document.getElementsByClassName('popup')
    for (let i = 0; i < clear.length; i++) {
      clear[i].className = ''
    }


  }

  public generateCalendarDays(monthIndex: number): void {

    this.calendar = [];

    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.service.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }



}


