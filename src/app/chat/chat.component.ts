import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import {WebsocketService} from './../websocket.service';
import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  loaderShow: boolean = false;
    timeLeft: number = 15;
    interval: any;
    response:any;
    userEmail:any;
    userPassword:any;
    user_id:any;
    userList:any=[];
    fileErrorMsg:any;
    filer: any = [];
    fileOpen:any;
    messageList:any=[];
    other_id:any;
    otherInfo:any=[];
    myInfo:any=[];

  constructor(private webSocketService: WebsocketService,private loginAuth: ApiService) {
            // Open connection with server socket
            let stompClient = this.webSocketService.connect();
            stompClient.connect({}, () => {
    		      	// Subscribe to notification topic
                stompClient.subscribe('/topic/'+this.user_id, (notification:any) => {
    				        // Update notifications attribute with the recent messsage sent from the server
                    this.messageList.push(JSON.parse(notification.body));
                })
            });
   }

  ngOnInit(): void {
          this.loaderShow = true;

          this.userEmail = sessionStorage.getItem('emailvalue');
          this.userPassword = sessionStorage.getItem('passwordvalue');
          this.user_id = sessionStorage.getItem('userId');

          this.loginAuth.getUserChatList(this.userEmail,this.userPassword).subscribe((res) => {
                                                 this.userList = res;
                                                 this.loginAuth.getUserInfoById(this.userEmail,this.userPassword,this.user_id).subscribe((res) => {
                                                                                                                     this.myInfo = res;
                                                                                                                    });
                                                 this.loaderShow = false;
                                                });
  }

  getChat(id:any){
      this.other_id = id;
      this.loginAuth.getUserInfoById(this.userEmail,this.userPassword,id).subscribe((res) => {
                                                                 this.otherInfo = res;
                                                                });

    this.loginAuth.getAllUsersMessages(this.userEmail,this.userPassword,[this.user_id,id]).subscribe((res) => {
                                                               this.messageList = res;
                                                               console.log(res)
                                                              });
  }

  startTimer() {
         this.interval = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                } else {
                    this.timeLeft = 15;
                    this.loaderShow = false;
                    this.pauseTimer();
                }
           }, 1500);
  }

  pauseTimer() {
        clearInterval(this.interval);
  }

  loginForm=new FormGroup({
              message:new FormControl('',[Validators.required]),
  });

  get Message():FormControl{
         return this.loginForm.get('message') as FormControl;
  }

  get f(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
  }

  loginProjet(): void {
              this.loaderShow = true;
              this.startTimer();
              this.loginAuth.sendUserMessage(this.userEmail,this.userPassword,[
                this.loginForm.value.message,'file',this.user_id,this.other_id
              ]).subscribe((res) => {
                                      this.loginForm.reset();
                                    });
  }

  logout(){
      this.loginAuth.logout();
  }

}
