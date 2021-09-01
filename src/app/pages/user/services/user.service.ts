import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../models/user.interface';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  server = environment.ip

  constructor(
    private http: HttpClient,
    private route: Router
    ) { }

  login(user: UserInterface): Observable<any> {
    const endpoint = this.server + '/login';
    return this.http.post(endpoint, user);
  }

  signup(user: UserInterface): Observable<any> {
    const endpoint = this.server + '/signup';
    return this.http.post(endpoint, user);
  }


  // // login(user: UserInterface): void {
  // login(user: UserInterface): Observable<any> {
  //   const endpoint = this.server + '/login';
  //   let result: any;

  //   this.http.post(endpoint, user, { responseType: 'text' }).subscribe(
  //     (response) => {
  //       let jwtDecode = jwt_decode(response);
  //       result = jwtDecode;

  //       localStorage.setItem(
  //         'timeToExpire',
  //         (
  //           new Date().getTime() +
  //           (jwtDecode['exp'] - 300000)
  //         ).toString()
  //       );

  //       // Redirigir a home, una vez logeado
  //       localStorage.setItem('user', user.email);
  //       localStorage.setItem('jwt', response);

  //     },
  //     (error) => {
  //       console.log(error);
  //       this.route.navigate(['login']);
  //     }
  //   );

  //   return result;
  // }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    this.route.navigate(['login']);
  }

}
