import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../shared/models/client';
import { environment } from '../../../environments/environment';
import { Cake } from '../../shared/models/cake';
import { CakeType } from '../../shared/models/cakeType';
import { CreditCard } from '../../shared/models/creditCard';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  /** AUTHENTIFICATION */

  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<Client>(
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

  /** GATEAUX */

  public getCakes(): Observable<Cake[]> {
    return this.http.get<Cake[]>(environment.backendGetCakes);
  }

  public getCakeTypes(): Observable<CakeType[]> {
    return this.http.get<CakeType[]>(environment.backendGetCakeTypes);
  }

  public searchCakes(name: string, typeId: number, minWeight: number, maxWeight: number, minPrice: number, maxPrice: number): Observable<Cake[]> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    let params = [];
    if (name) params.push('name=' + name);
    if (typeId) params.push('typeId=' + typeId);
    if (minWeight) params.push('minWeight=' + minWeight);
    if (maxWeight) params.push('maxWeight=' + maxWeight);
    if (minPrice) params.push('minPrice=' + minPrice);
    if (maxPrice) params.push('maxPrice=' + maxPrice);
    data = params.join('&');
    return this.http.post<Cake[]>(environment.backendSearchCakes, data, httpOptions);
  }

  /** UTILISATEURS */

  public getUser(): Observable<Client> {
    return this.http.get<Client>(environment.backendGetUser);
  }

  public updateUser(client: Client): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'firstname=' + client.firstname + '&lastname=' + client.lastname + '&email=' + client.email + '&login=' + client.login + '&password=' + client.password;
    return this.http.put<Client>(environment.backendUpdateUser, data, httpOptions);
  }

  /** CARTES */

  public getCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(environment.backendGetCards);
  }

  public getCardWithId(id: number): Observable<CreditCard> {
    return this.http.get<CreditCard>(environment.backendGetCards + "/" + id);
  }

  public addCard(card: CreditCard): Observable<CreditCard> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'number=' + card.number + '&holderName=' + card.holderName + '&type=' + card.type + '&expirationDate=' + card.expirationDate + '&cvv=' + card.cvv;
    return this.http.post<CreditCard>(environment.backendAddCard, data, httpOptions);
  }

  public updateCard(id: number, card: CreditCard): Observable<CreditCard> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'number=' + card.number + '&holderName=' + card.holderName + '&type=' + card.type + '&expirationDate=' + card.expirationDate + '&cvv=' + card.cvv;
    return this.http.put<CreditCard>(environment.backendUpdateCard + "/" + id, data, httpOptions);
  }

  public deleteCard(id: number): Observable<CreditCard> {
    return this.http.delete<CreditCard>(environment.backendDeleteCard + "/" + id);
  }

}
