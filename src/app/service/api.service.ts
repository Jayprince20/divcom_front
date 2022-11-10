import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private router: Router) { }

    baseServerUrl = 'http://localhost:8181/';
    //baseServerUrl = 'https://divcom.herokuapp.com/';


    logout(): void {
         sessionStorage.removeItem('userId');
         sessionStorage.removeItem('emailvalue');
         sessionStorage.removeItem('passwordvalue');
         sessionStorage.removeItem('userTypevalue');

         sessionStorage.clear();
         this.router.navigate(['login']);
    }

    getAllRoles(username: any, password: any) {
          const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(username + ':' + password),
          });

          return this.http.get(this.baseServerUrl + 'admin/roles', {
            headers,
          });
    }

    getAllUsers(username: any, password: any) {
              const headers = new HttpHeaders({
                Authorization: 'Basic ' + btoa(username + ':' + password),
              });

              return this.http.get(this.baseServerUrl + 'admin/users', {
                headers,
              });
    }

    loginUser(username: any, password: any) {
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(username + ':' + password),
      });

      return this.http.get(this.baseServerUrl + 'login/'+username, {
        headers,
      });
    }

    registerUser(username: any, password: any,Utilisateur:Array<any>) {

       const headers = new HttpHeaders({
                      Authorization: 'Basic ' + btoa(username + ':' + password),
                    });

        return this.http.post(this.baseServerUrl + 'admin/user',
          {
            firstname:Utilisateur[0],
            secondname:Utilisateur[1],
            email:Utilisateur[2],
            password:Utilisateur[3],
            profile_pic:Utilisateur[4],
            idrole:Utilisateur[5]
          },{
              headers,
           }
        );
    }


    getMailsFiles(username: any, password: any,id: any) {

           const headers = new HttpHeaders({
                                  Authorization: 'Basic ' + btoa(username + ':' + password),
                               });

           return this.http.get(this.baseServerUrl + 'mails/'+id,{
                       headers,
                     }
           );
    }

    updateUser(username: any, password: any,id: any,Utilisateur:Array<any>) {

               const headers = new HttpHeaders({
                              Authorization: 'Basic ' + btoa(username + ':' + password),
                            });

                return this.http.put(this.baseServerUrl + 'user/'+id,
                  {
                    password:Utilisateur[0],
                  },
                  {
                      headers,
                   }
                );
    }

    addMymedia(username: any, password: any,Mymedia:Array<any>) {

                   const headers = new HttpHeaders({
                                  Authorization: 'Basic ' + btoa(username + ':' + password),
                                });

                    return this.http.post(this.baseServerUrl + 'mymedia',
                      {
                        picture:Mymedia[0],
                        video:Mymedia[1],
                        message:Mymedia[2],
                        userid:Mymedia[3]
                      },
                      {
                          headers,
                       }
                    );
    }

    getUserMedia(username: any, password: any,id: any) {

                       const headers = new HttpHeaders({
                                      Authorization: 'Basic ' + btoa(username + ':' + password),
                                    });

                        return this.http.post(this.baseServerUrl + 'mymedia/'+id,
                          {
                              headers,
                           }
                        );
    }

    getAllMymedia(username: any, password: any) {

                       const headers = new HttpHeaders({
                                      Authorization: 'Basic ' + btoa(username + ':' + password),
                                    });

                        return this.http.get(this.baseServerUrl + 'mymedia',
                          {
                              headers,
                           }
                        );
    }

    addNotification(username: any, password: any,Notification:Array<any>) {

                       const headers = new HttpHeaders({
                                      Authorization: 'Basic ' + btoa(username + ':' + password),
                                    });

                        return this.http.post(this.baseServerUrl + 'admin/notify',
                          {
                            message:Notification[0],
                          },
                          {
                              headers,
                           }
                        );
    }

    getNotification(username: any, password: any) {

                           const headers = new HttpHeaders({
                                          Authorization: 'Basic ' + btoa(username + ':' + password),
                                        });

                            return this.http.get(this.baseServerUrl + 'admin/notification',
                              {
                                  headers,
                               }
                            );
    }

    getUserChatList(username: any, password: any) {

                               const headers = new HttpHeaders({
                                              Authorization: 'Basic ' + btoa(username + ':' + password),
                                            });

                                return this.http.get(this.baseServerUrl + 'user',
                                  {
                                      headers,
                                   }
                                );
    }

    sendUserMessage(username: any, password: any,Chat:Array<any>) {

                               const headers = new HttpHeaders({
                                              Authorization: 'Basic ' + btoa(username + ':' + password),
                                            });

                                return this.http.post(this.baseServerUrl + 'chat',
                                  {
                                     message:Chat[0],
                                     doc:Chat[1],
                                     senderid:Chat[2],
                                     receiverid:Chat[3]
                                  },
                                  {
                                      headers,
                                   }
                                );
    }

    getAllUsersMessages(username: any, password: any,Chat:Array<any>) {

                                   const headers = new HttpHeaders({
                                                  Authorization: 'Basic ' + btoa(username + ':' + password),
                                                });

                                    return this.http.post(this.baseServerUrl + 'chat/messages',
                                      {
                                         senderid:Chat[0],
                                         receiverid:Chat[1]
                                      },
                                      {
                                          headers,
                                       }
                                    );
    }

    getUserInfoById(username: any, password: any,id:any) {

                                       const headers = new HttpHeaders({
                                                      Authorization: 'Basic ' + btoa(username + ':' + password),
                                                    });

                                        return this.http.get(this.baseServerUrl + 'user/'+id,
                                          {
                                              headers,
                                           }
                                        );
    }



}
