import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Encuesta } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class EncuestaService {
  apiUrl = environment.serviceURI;
  constructor(private http: HttpClient) { }

  getCat(name: string): Observable<Encuesta> {
    return this.http.get<Encuesta>(this.apiUrl + name);
  }

  insertCat(cat: Encuesta): Observable<Encuesta> {
    return this.http.post<Encuesta>(this.apiUrl, cat);
  }

  updateCat(cat: Encuesta): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/' + cat.cedula, cat);
  }

}
