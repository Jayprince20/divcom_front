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

  constructor(private loginAuth: ApiService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
      this.loaderShow = true;

      this.userEmail = sessionStorage.getItem('emailvalue');
      this.userPassword = sessionStorage.getItem('passwordvalue');
      this.userTypevalue = sessionStorage.getItem('userTypevalue');
      this.user_id = sessionStorage.getItem('userId');

      /* this.loginAuth.getAllMails(this.userEmail,this.userPassword).subscribe((res) => {
                                             this.mailList = res;
                                             this.loaderShow = false;
                                            }); */

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

  handleUpload($event: any) {
      for (let i = 0; i < $event.target.files.length; i++) {
               const file = $event.target.files[i];
               let filetype = file.type ;
               if(filetype != "application/pdf"){
                      $event.target.value = [];
                      this.fileErrorMsg = "Please enter only pdf file";
               }else{
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                            reader.onload = () => {
                            //this.filer = reader.result;
                            this.filer.push(reader.result);
                             //console.log('fichier : ' + this.filer);
                            };
              }
      }


  }

  // base64 to buffer
  base64ToBufferAsync(base64: any) {
      fetch(base64)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          console.log('base64 to buffer: ' + new Uint8Array(buffer));
        });
  }

  loginForm=new FormGroup({
            origin:new FormControl('',[Validators.required]),
            subject:new FormControl('',[Validators.required]),
            reference:new FormControl('',[Validators.required]),
            ranking:new FormControl('',[Validators.required]),
  });

  get Origin():FormControl{
       return this.loginForm.get('origin') as FormControl;
  }

  get Subject():FormControl{
       return this.loginForm.get('subject') as FormControl;
  }

  get Reference():FormControl{
       return this.loginForm.get('reference') as FormControl;
  }

  get ranking():FormControl{
       return this.loginForm.get('ranking') as FormControl;
  }


  get f(): { [key: string]: AbstractControl } {
      return this.loginForm.controls;
  }

  loginProjet(): void {
            this.loaderShow = true;
            this.startTimer();
            /* this.loginAuth.addMails(this.userEmail,this.userPassword,[
              this.user_id,this.loginForm.value.origin,
              this.loginForm.value.subject,this.loginForm.value.reference,
              this.loginForm.value.ranking,this.filer
            ]).subscribe((res) => {
                                    this.filer = [];
                                    this.loginForm.reset();
                                    this.loginAuth.getAllMails(this.userEmail,this.userPassword)
                                    .subscribe((resp) => {
                                                           this.mailList = resp;
                                                           this.pauseTimer();
                                                           this.loaderShow = false;
                                                          });
                                  }); */
  }

  logout(){
    this.loginAuth.logout();
  }

  openFile(item:any,mail_id:any){
      this.fileOpen = this.sanitizer.bypassSecurityTrustResourceUrl(item);
     /*  if(this.userTypevalue === 'HEAD-OFFICE'){
          this.loginAuth.updateMailsFiles(this.userEmail,this.userPassword,mail_id)
                     .subscribe((resp) => {
                                           this.loginAuth.getAllMails(this.userEmail,this.userPassword)
                                                          .subscribe((resp) => {
                                                                               this.mailList = resp;
                                                                               this.pauseTimer();
                                                                                this.loaderShow = false;
                                                                               });
                                           });
      } */
  }

  tet:any;
  dateForm(item:any){

    return this.tet;
  }

}
