import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { ApiService } from './service/api.service';
import {WebsocketService} from './websocket.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeuserComponent } from './homeuser/homeuser.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AgendaComponent } from './agenda/agenda.component';
import { MymediaComponent } from './mymedia/mymedia.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NotificationComponent } from './notification/notification.component';

FullCalendarModule.registerPlugins([
  interactionPlugin,
  dayGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeuserComponent,
    HomeadminComponent,
    ChatComponent,
    ProfileComponent,
    AboutusComponent,
    AgendaComponent,
    MymediaComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
