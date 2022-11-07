import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators, AbstractControl } from '@angular/forms';
import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loaderShow: boolean = false;
  timeLeft: number = 15;
  interval: any;
  userInfo:any=[];
  userEmail:any;
  userPassword:any;
  userTypevalue:any;
  user_id:any;
  password_error:any;

  constructor(private loginAuth: ApiService) { }

  ngOnInit(): void {
      this.userEmail = sessionStorage.getItem('emailvalue');
      this.userPassword = sessionStorage.getItem('passwordvalue');
      this.userTypevalue = sessionStorage.getItem('userTypevalue');
      this.user_id = sessionStorage.getItem('userId');

      this.loginAuth.loginUser(this.userEmail,this.userPassword)
                      .subscribe((res) => {
                                     this.userInfo = res;
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
          current_password:new FormControl('',[Validators.required]),
          new_password:new FormControl('',[Validators.required]),
          confirm_password:new FormControl('',[Validators.required]),
  });

  get Current_password():FormControl{
      return this.loginForm.get('current_password') as FormControl;
  }

  get New_password():FormControl{
     return this.loginForm.get('new_password') as FormControl;
  }

  get Confirm_password():FormControl{
     return this.loginForm.get('confirm_password') as FormControl;
  }

  get f(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
  }

  loginProjet(): void {
      if(this.loginForm.value.new_password === this.loginForm.value.confirm_password){
        this.loaderShow = true;
                      this.startTimer();
                      this.loginAuth.updateUser(this.userEmail,this.userPassword,this.user_id,[
                        this.loginForm.value.confirm_password
                      ]).subscribe((res) => {
                                   this.userPassword = this.loginForm.value.confirm_password;
                                   sessionStorage.setItem('passwordvalue', this.userPassword);
                                   this.loginAuth.loginUser(this.userEmail,this.userPassword)
                                       .subscribe((resp) => {
                                                      this.loginForm.reset();
                                                      this.userInfo = resp;
                                                      this.pauseTimer();
                                                      this.loaderShow = false;
                                                  });
                                            });
      }else{
        this.password_error = "Passwords don't match";
      }

  }

  logout(){
    this.loginAuth.logout();
  }

}
