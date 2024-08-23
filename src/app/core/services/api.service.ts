import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.serverUrl}${path}`, { params });
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(`${environment.serverUrl}${path}`, JSON.stringify(body));
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${environment.serverUrl}${path}`, JSON.stringify(body));
  }

  delete(path: any): Observable<any> {
    return this.http.delete(`${environment.serverUrl}${path}`);
  }

}
