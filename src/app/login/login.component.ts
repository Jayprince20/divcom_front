import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userEmail: any;
    userPassword: any;
    userType:any;
    loaderShow: boolean = false;
    timeLeft: number = 15;
    interval: any;
    response:any;

  constructor(private router:Router,private loginAuth: ApiService) { }

  ngOnInit(): void {
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
          email:new FormControl('',[Validators.required,Validators.email]),
          password:new FormControl('',[
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(15),
          ]),
        });

        get Email():FormControl{
          return this.loginForm.get('email') as FormControl;
        }

        get password(): FormControl{
          return this.loginForm.get('password') as FormControl;
        }

        get f(): { [key: string]: AbstractControl } {
            return this.loginForm.controls;
        }

    loginProjet(): void {
          this.loaderShow = true;
          this.startTimer();

          this.loginAuth
                  .loginUser(this.loginForm.value.email,this.loginForm.value.password)
                  .subscribe((res) => {
                                 this.response = res;

                                 this.userEmail = this.loginForm.value.email;
                                 this.userPassword = this.loginForm.value.password;

                                 sessionStorage.setItem('emailvalue', this.userEmail);
                                 sessionStorage.setItem('passwordvalue', this.userPassword);

                                 sessionStorage.setItem('userId',this.response.user_id)
                                 sessionStorage.setItem('userTypevalue', this.response.idrole.rolename);

                                 this.pauseTimer();
                                 this.loaderShow = false;

                                 if(this.response.idrole.rolename ==='ADMIN'){
                                   this.router.navigate(['admin']);
                                 }else{
                                    this.router.navigate(['home']);
                                 }

                                },error => {
                                 if(error.status==0){
                                             this.response = "Please Check your Internet Connection !";
                                 }
                                 if(error.status==401){
                                             this.response = "Wrong Email or Password!";
                                 }

                                 this.pauseTimer();
                                 this.loaderShow = false;
                              }

                  );
    }

}
