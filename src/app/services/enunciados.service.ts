import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Enunciados } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class EnunciadosService {
  apiUrl = `${environment.serviceURI}enunciados`;
  constructor(private http: HttpClient) { }

  getVal(): Observable<Enunciados[]> {
    return this.http.get<Enunciados[]>(`${this.apiUrl}`).pipe(
      map((data: any) => {
        return data.enunciado;
      })
    );
  }

  insertVal(val: Enunciados): Observable<Enunciados> {
    return this.http.post<Enunciados>(this.apiUrl, val);
  }

  updateVal(val: Enunciados): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/' + val, val);
  }

}
