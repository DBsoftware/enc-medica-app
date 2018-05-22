import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginService } from '../../services/login.service';
import { LoginData } from '../../interfaces/login-data';
import { Users } from '../../interfaces/users';
import { Users as usersData} from '../../data/users';
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
              private loginService: LoginService) {}

  users: Users[] = usersData;

  ngOnInit() {
    this.loginService.currentMessage.subscribe(message => this.loginAux = message);
  }


  guardar = (f) => {
    (this.users.findIndex(x => x.user === f.value.user) !== -1 ) ?
      this.validUser(f) :
      this.elseBehaviour();
  }

    elseBehaviour() {
      this.case = true;
      setTimeout(() => {
        this.case = false;
      }, 2000);
    }


    validLogin(f) {
      this.loginService.changeMessage({ind: true, cedula: f.value.user});
      localStorage.setItem('ced', f.value.user);
      this.bsModalRef.hide();
    }

    validUser(f) {
      (this.users[this.users.findIndex(x => x.user === f.value.user)].pass === f.value.pass ) ?
      this.validLogin(f) :
      this.elseBehaviour();
    }

}

