import { Component, OnInit } from '@angular/core';
import {WebsocketService} from './../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public notifications:any = 0;

  constructor(private webSocketService: WebsocketService) {
            // Open connection with server socket
            let stompClient = this.webSocketService.connect();
            stompClient.connect({}, () => {
    		      	// Subscribe to notification topic
                stompClient.subscribe('/topic/notification', (notification:any) => {
    				        // Update notifications attribute with the recent messsage sent from the server
                    this.notifications = JSON.parse(notification.body).count;
                })
            });
   }

  ngOnInit(): void {
  }

}
