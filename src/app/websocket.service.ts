import { Injectable } from '@angular/core';
/* import * as Rx from 'rxjs/Rx'; */

var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

   // Open connection with the back-end socket
      public connect() {
          let socket = new SockJs(`http://localhost:8181/socket`);

          let stompClient = Stomp.over(socket);

          return stompClient;
      }


/*
  private subject: Rx.Subject<MessageEvent>;

  public connect(url:String):Rx.Subject<MessageEvent>{
    if(!this.subject){
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url:String):Rx.Subject<MessageEvent>{
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs:Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      }
    );

    let observer = {
      next: (data:Object) => {
        if(ws.readyState === WebSocket.OPEN){
          ws.send(JSON.stringify(data));
        }
      }
    }

    return Rx.Subject.create(observer,observable);
  } */

}
