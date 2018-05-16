import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginData } from '../interfaces/login-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private messageSource = new BehaviorSubject<LoginData>({ind: false, cedula: ''});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: LoginData) {
    this.messageSource.next(message);
  }
}
