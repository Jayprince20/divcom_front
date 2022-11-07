import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeuserComponent } from './homeuser/homeuser.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AgendaComponent } from './agenda/agenda.component';
import { MymediaComponent } from './mymedia/mymedia.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeuserComponent
  },
  {
    path:'admin',
    component:HomeadminComponent
   },
  {
    path:'chat',
    component:ChatComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'aboutus',
    component:AboutusComponent
  },
  {
    path:'agenda',
    component:AgendaComponent
  },
  {
    path:'mymedia',
      component:MymediaComponent
  },
  {
      path:'notification',
        component:NotificationComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   schemas: [
            CUSTOM_ELEMENTS_SCHEMA,
            NO_ERRORS_SCHEMA
          ]
})
export class AppRoutingModule { }
