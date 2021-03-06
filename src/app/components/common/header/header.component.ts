import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { LoginData } from '../../../interfaces/login-data';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  loginAux: LoginData;
  bsModalRef: BsModalRef;
  constructor(private loginService: LoginService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loginService.currentMessage.subscribe(data => this.loginAux = data);
  }

  openModal = () => {
    const initialState: {} = {};
    initialState['title'] = 'Login';
    this.modalInit(initialState);
  }

  closeSession() {
    this.loginService.changeMessage({ind: false, cedula: ''});
    localStorage.removeItem('ced');
  }

  modalInit(initialState) {
    this.bsModalRef = this.modalService.show(ModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
