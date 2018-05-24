import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginService, UsuariosService } from '../../services/services';
import { LoginData, Users } from '../../interfaces/interfaces';
import { FormGroup } from '@angular/forms';
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
  case = false;

  constructor(public bsModalRef: BsModalRef,
              private loginService: LoginService,
              private userService: UsuariosService
            ) {}


  ngOnInit() {
    this.loginService.currentMessage.subscribe(message => this.loginAux = message);
  }


  guardar = (f) => {
    this.userService.getVal(f.value.user).subscribe(data => {
      this.validUser(data, f.value);
    }, err => {
      this.elseBehaviour();
    });
  }

    elseBehaviour() {
      this.case = true;
      setTimeout(() => {
        this.case = false;
      }, 3000);
    }


    validLogin(aux) {
      this.loginService.changeMessage({ind: true, cedula: aux});
      localStorage.setItem('ced', aux);
      this.bsModalRef.hide();
    }

    validUser(d: Users, {user, pass}) {
      (d) ? ((d.pass === pass) ?
      this.validLogin(user) :
      this.elseBehaviour()) :
      this.elseBehaviour();
    }

}

