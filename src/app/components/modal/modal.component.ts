import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginService } from '../../services/login.service';
import { LoginData } from '../../interfaces/login-data';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
  }
  `]
})
export class ModalComponent implements OnInit {

  title: string;
  closeBtnName: string;
  list: any[] = [];
  loginAux: LoginData;
  constructor(public bsModalRef: BsModalRef,
              private loginService: LoginService) {}

  users: any[] = [
    {user: "12345",
    pass: "12345"}
  ];

  ngOnInit() {
    this.loginService.currentMessage.subscribe(message => this.loginAux = message);
  }


  guardar = (f) => {
    if (this.users.findIndex(x => x.user === f.value.user) !== -1 ) {
      this.loginService.changeMessage({ind: true, cedula: f.value.user});
      this.bsModalRef.hide();
    }
  }



}

