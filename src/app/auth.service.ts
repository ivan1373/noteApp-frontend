import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from './model/token';
import { map } from 'rxjs/operators';
import { User } from './model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ROOT_URL = 'https://angularnote.herokuapp.com/api/v1';
  private currentTokenSubject: BehaviorSubject<Token>;
  

  constructor(private http: HttpClient) { 
    this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('accessToken')));
      
  }

  
  public get currentTokenValue(): Token {
    return this.currentTokenSubject.value;
  }

  register(data) {
    return this.http.post(`${this.ROOT_URL}/signup`, data);
  }

  login(email: string, password: string) {
    return this.http.post<Token>(`${this.ROOT_URL}/login`, { email, password })
        .pipe(map(token => {
            // login successful if there's a jwt token in the response
            if (token && token.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('accessToken', JSON.stringify(token));
                this.currentTokenSubject.next(token);
                //window.location.reload();
            }

            return token;
            //console.log("Hello");
        }));

  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.ROOT_URL}/user`);    
  }

  

  logout() {
    // remove user from local storage to log user out
   //localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.currentTokenSubject.next(null);
    //window.location.reload();
}
}
