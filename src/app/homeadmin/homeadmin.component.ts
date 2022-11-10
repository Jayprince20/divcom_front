import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.css']
})
export class HomeadminComponent implements OnInit {
  loaderShow: boolean = false;
  timeLeft: number = 15;
  interval: any;
  userEmail:any;
  userPassword:any;
  userTypevalue:any;
  usersList:any=[];
  mailsList:any=[];
  roleList:any=[];
  fileErrorMsg:any;
  filer: any;
  imageBytes: any;
  fileOpen:any;

  constructor(private loginAuth: ApiService) { }

  ngOnInit(): void {
    this.loaderShow = true;

    this.userEmail = sessionStorage.getItem('emailvalue');
    this.userPassword = sessionStorage.getItem('passwordvalue');
    this.userTypevalue = sessionStorage.getItem('userTypevalue');

    this.loginAuth.getAllUsers(this.userEmail,this.userPassword).subscribe((res) => {
                                       this.usersList = res;
                                       this.loginAuth.getAllRoles(this.userEmail,this.userPassword).subscribe((res) => {
                                                                          this.roleList = res;
                                                                          this.loaderShow = false;
                                                                         });
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

  handleUpload($event: any) {
        for (let i = 0; i < $event.target.files.length; i++) {
                 const file = $event.target.files[i];
                 let filetype = file.type ;
                 console.log(filetype)
                 if(filetype != "image/jpeg" && filetype != "image/png"){
                        $event.target.value = [];
                        this.fileErrorMsg = "Please enter only pdf file";
                 }else{
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                              reader.onload = () => {
                              this.filer = reader.result;
                              console.log(this.filer)
                              };
                }
        }


    }

  loginForm=new FormGroup({
          firstname:new FormControl('',[Validators.required]),
          secondname:new FormControl('',[Validators.required]),
          idrole:new FormControl('',[Validators.required]),
          email:new FormControl('',[Validators.required,Validators.email]),
          password:new FormControl('',[
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(15),
          ]),
  });

  get Firstname():FormControl{
        return this.loginForm.get('firstname') as FormControl;
  }

  get Secondname():FormControl{
          return this.loginForm.get('secondname') as FormControl;
  }

  get Idrole():FormControl{
              return this.loginForm.get('idrole') as FormControl;
  }

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
          this.loginAuth.registerUser(this.userEmail,this.userPassword,[
            this.loginForm.value.firstname,this.loginForm.value.secondname,
            this.loginForm.value.email,this.loginForm.value.password,
            this.filer,this.loginForm.value.idrole
          ]).subscribe((res) => {
                                  this.loginAuth.getAllUsers(this.userEmail,this.userPassword)
                                  .subscribe((resp) => {
                                                         this.filer =[];
                                                         this.loginForm.reset();
                                                         this.usersList = resp;
                                                         this.pauseTimer();
                                                         this.loaderShow = false;
                                                        });
                                });
  }

  logout(){
      this.loginAuth.logout();
  }

}
