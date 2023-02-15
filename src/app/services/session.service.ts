import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // urlAPI = 'http://dihops.com:12080/api/v1'
  url = 'http://localhost:3000'
  urlAPI = 'http://localhost:12080/api/v1'
  user:any;
  public username = ''
  constructor() {
    const existUser = localStorage.getItem('user');
    this.username = existUser == null ? '' : JSON.parse(existUser).usuario;
    this.user = existUser == null ? '' : JSON.parse(existUser);
    // console.log(this.user);
    if(environment.production){
      this.urlAPI = '/api/v1';
    }
    // console.log(this.urlAPI);
  }

  setDatauser(datauser:any){
    this.user = datauser;
    this.username = datauser.username;
  }


}
