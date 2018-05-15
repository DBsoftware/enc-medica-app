import { Injectable } from '@angular/core';
import { Enunciados } from '../interfaces/enunciados';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnunciadosService {
  constructor(private http: HttpClient) {}

  getEnunciados = (): Observable<any> => this.http.get('http://localhost:4200/assets/data/preguntas.json');
}
