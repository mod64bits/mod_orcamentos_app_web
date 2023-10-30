import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/authRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/authResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    ){ }

  authUser(resquestData: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/api/token/`, resquestData);
  }


  isLoggedIn(): boolean {
    const ACCESS_TOKEN = this.cookie.get('USER_INFO');
    return ACCESS_TOKEN ? true : false;

  }

}
