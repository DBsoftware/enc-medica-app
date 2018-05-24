import { Component, TemplateRef } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Enunciados as iEnunciados, LoginData, Encuesta } from '../../interfaces/interfaces';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from '../modal/modal.component';
import { LoginService, EncuestaService, FormCtrlr, EnunciadosService } from '../../services/services';


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
              private encuesta: EncuestaService,
              private formCtr: FormCtrlr,
              private enunciadosService: EnunciadosService
          ) {
       this.enunciadosService.getVal().subscribe(data => {
        this.enunciados = data;
        this.forma = formCtr.formBuilder(this.enunciados);
        this.verifySession();
       });
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
    initialState['title'] = 'Login';
    this.modalInit(initialState);
  }

  validSubmit() {
    const initialState: {} = {};
    this.forma.value['cedula'] = this.loginAux.cedula;
    this.submitState = 'En proceso';
    this.encuesta.insertCat(this.forma.value).subscribe(data => {
    this.submitState = 'Submit';
    initialState['title'] = 'Success';
    this.modalInit(initialState);
  },
  err => {
    initialState['title'] = 'Fail';
    this.submitState = 'Submit';
    this.modalInit(initialState);
    console.log(`Error occured: ${err.message}`);
  });
  }

  modalInit(initialState) {
    this.bsModalRef = this.modalService.show(ModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
