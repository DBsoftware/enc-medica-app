import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Encuesta } from '../interfaces/encuesta';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class EncuestaService {
  apiUrl ='https://servicio-encuesta.herokuapp.com/encuesta';
  // apiUrl= 'http://localhost:3000/encuesta';
  constructor(private http: HttpClient) { }

  getCat(name: string): Observable<Encuesta> {
    return this.http.get<Encuesta>(this.apiUrl + name);
  }

  insertCat(cat: Encuesta): Observable<Encuesta> {
    console.log( this.apiUrl);
    return this.http.post<Encuesta>(this.apiUrl, JSON.stringify(cat));
  }

  updateCat(cat: Encuesta): Observable<void> {
    return this.http.put<void>(this.apiUrl + cat.cedula, cat);
  }

}
