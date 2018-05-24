import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Users } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  apiUrl = `${environment.serviceURI}user/`;
  constructor(private http: HttpClient) { }

  getVal(name: string): Observable<Users> {
    return this.http.get<Users>(this.apiUrl + name).pipe(
      map((data: any) => {
        return data.user;
      })
    );
  }

  insertVal(val: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, val);
  }

  updateVal(val: Users): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/' + val, val);
  }

}
