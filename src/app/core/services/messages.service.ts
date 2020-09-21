import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  public get apiUrl(): string { return environment.apiUrl; }

  constructor(private http: HttpClient) { }

  public addMessage(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${id}`);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${id}`);
  }

  // public getAll(take: number, skip: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/messages`);
  // }

  public getAll(take: number, skip: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages?take=${take}&skip=${skip}`);
  }

  public create(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, data);
  }

  public update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/messages/${id}`, data);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/messages/${id}`);
  }
}
