import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

//NO_ERRORS_SCHEMA'

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  calendarMonthDays: any = [];
  events:any = {title: 'event', start:'2022-12-15'};
  calendarOptions: CalendarOptions= {
                                          initialView: 'dayGridMonth',
                                          dateClick: this.handleDateClick.bind(this),
                                          events: this.events
                                        };

  constructor() { }

  ngOnInit(): void {
  //this.events.push('2022-12-15');

  }

  handleDateClick(arg: any) {
      alert('date click! ' + arg.dateStr)
  }

}
