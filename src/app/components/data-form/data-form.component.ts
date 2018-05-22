import { Component, TemplateRef } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Enunciados as iEnunciados, LoginData, Encuesta } from '../../interfaces/interfaces';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from '../modal/modal.component';
import { LoginService, EncuestaService } from '../../services/services';
import { FormCtrlr } from '../../utils/formCtrlr';
import { Enunciados } from '../../data/preguntas';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styles: []
})
export class DataFormComponent  {
    enunciados: iEnunciados[];
    forma: FormGroup;
    bsModalRef: BsModalRef;
    loginAux: LoginData;
    submitState = 'Submit';

  constructor(
              private modalService: BsModalService,
              private loginService: LoginService,
              private encuesta: EncuestaService
          ) {
       this.verifySession();
       this.enunciados = Enunciados;
       this.forma = new FormCtrlr(this.enunciados).formBuilder();

  }

  verifySession = () => {
    this.loginService.currentMessage.subscribe(data => this.loginAux = data);
    if (localStorage.getItem('ced')) {
      this.loginService.changeMessage({ind: true, cedula: localStorage.getItem('ced')});
    }
  }

  submitForm() {
    (this.forma.valid && this.loginAux.cedula !== '') ?
      this.validSubmit() :
      console.log('los campos son requeridos');
  }


  openModal = () => {
    const initialState: {} = {};
    this.modalInit(initialState['title'] = 'Login');
  }

  validSubmit() {
    const initialState: {} = {};
    this.forma.value['cedula'] = this.loginAux.cedula;
    this.submitState = 'En proceso';
    this.encuesta.insertCat(this.forma.value).subscribe(data => {
    this.submitState = 'Submit';
    this.modalInit(initialState['title'] = 'Success');
  },
  err => {
    this.modalInit(initialState['title'] = 'Fail');
    console.log(`Error occured: ${err.message}`);
  });
  }

  modalInit(initialState){
    this.bsModalRef = this.modalService.show(ModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
