import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { environment } from '../environments/environment';
import { Cake } from '../models/cake';
import { LoginResponse } from '../app/components/login/loginResponse';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  public loginClient(login: string, password: string): Observable<LoginResponse> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<LoginResponse>(
      environment.backendUserLogin,
      data,
      httpOptions
    );
  }

  public registerClient(client : Client): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'firstname=' + client.firstname + '&lastname=' + client.lastname + '&email=' + client.email + '&login=' + client.login + '&password=' + client.password;
    return this.http.post<Client>(
      environment.backendUserRegister,
      data,
      httpOptions
    );
  }

  public getCakes(): Observable<Cake[]> {
    return this.http.get<Cake[]>(environment.backendCakes);
  }

  public getCurrentUserInfos(): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'token=' + localStorage.getItem('token');
    return this.http.post<Client>(environment.backendUserByToken, data, httpOptions);
  }

  public updateUserInfos(client: Client): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'token=' + localStorage.getItem('token') + '&firstname=' + client.firstname + '&lastname=' + client.lastname + '&email=' + client.email + '&login=' + client.login + '&password=' + client.password;
    return this.http.put<Client>(environment.backendUserByToken, data, httpOptions);
  }
}
