import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [{
  path: '',
  component: MainComponent
},
{
  path: 'calendar',
  component: CalendarComponent
},
{
  path: 're',
  component: CalendarComponent

}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
