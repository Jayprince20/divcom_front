import { Component, OnInit } from '@angular/core';
import {WebsocketService} from './../websocket.service';

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.css']
})
export class HomeuserComponent implements OnInit {
  notifications:any=[];

  constructor(private webSocketService: WebsocketService) {
                    // Open connection with server socket
                    let stompClient = this.webSocketService.connect();
                    stompClient.connect({}, () => {
            		      	// Subscribe to notification topic
                        stompClient.subscribe('/topic/notification', (notification:any) => {
            				        // Update notifications attribute with the recent messsage sent from the server
                            this.notifications = JSON.parse(notification.body);
                        })
                    });
  }

  ngOnInit(): void {
  }

}
