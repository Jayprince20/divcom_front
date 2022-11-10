import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { ApiService } from './../service/api.service';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
 loaderShow: boolean = false;
  timeLeft: number = 15;
  interval: any;
  response:any;
  userEmail:any;
  userPassword:any;
  userTypevalue:any;
  user_id:any;
  mailList:any=[];
  fileErrorMsg:any;
  filer: any = [];
  imageBytes: any;
  fileOpen:any;

  constructor(private loginAuth: ApiService,private sanitizer: DomSanitizer) {

   }

  ngOnInit(): void {
      this.loaderShow = true;

      this.userEmail = sessionStorage.getItem('emailvalue');
      this.userPassword = sessionStorage.getItem('passwordvalue');
      this.userTypevalue = sessionStorage.getItem('userTypevalue');
      this.user_id = sessionStorage.getItem('userId');

      this.loginAuth.getNotification(this.userEmail,this.userPassword).subscribe((res) => {
                                             this.mailList = res;
                                             this.loaderShow = false;
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
            this.loginAuth.addNotification(this.userEmail,this.userPassword,[
              this.loginForm.value.message
            ]).subscribe((res) => {
                                    this.loginForm.reset();
                                    this.loginAuth.getNotification(this.userEmail,this.userPassword).subscribe((res) => {
                                                                                 this.mailList = res;
                                                                                 console.log(res)
                                                                                 this.loaderShow = false;
                                                                                });
                                  });
  }

  logout(){
    this.loginAuth.logout();
  }

  openFile(item:any,mail_id:any){
      this.fileOpen = this.sanitizer.bypassSecurityTrustResourceUrl(item);
  }

  tet:any;
  dateForm(item:any){

    return this.tet;
  }

}
