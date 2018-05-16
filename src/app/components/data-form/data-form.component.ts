import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { EnunciadosService } from '../../services/enunciados.service';
import { Enunciados, Preguntas } from '../../interfaces/enunciados';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from '../modal/modal.component';
import { LoginService } from '../../services/login.service';
import { LoginData } from '../../interfaces/login-data';
import { Encuesta } from '../../interfaces/encuesta';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styles: []
})
export class DataFormComponent implements OnInit {
    enunciados: Enunciados[];
    forma: FormGroup;
    inputPreguntas: FormControl[] = [];
    auxArray: any [] = [];
    bsModalRef: BsModalRef;
    loginAux: LoginData;
    formValue: Encuesta;
    submitState = 'Submit';
  constructor(private _enunciadoService: EnunciadosService,
              private modalService: BsModalService,
              private loginService: LoginService,
              private encuesta: EncuestaService
          ) {
      this.verifySession();
     _enunciadoService.getEnunciados().subscribe(data => {
       this.enunciados = data;
       this.organizeRadioObjects();

       this.forma = new FormGroup(this.createFormOjb());
     });

  }

  verifySession = () => {
    if (localStorage.getItem('ced')) {
      this.loginService.changeMessage({ind: true, cedula: localStorage.getItem('ced')});
    }
  }
 createFormOjb = () => {
    const formObj = {};
    for (let i = 0; i < this.enunciados.length; i++) {
      formObj['s' + (i + 1)] = new FormArray(this.auxArray[i]);
    }
    return formObj;
 }

  organizeRadioObjects = () => {
    for (let i = 0; i < this.enunciados.length; i++) {
      for (let j = 0; j < this.enunciados[i].preguntas.length ; j++) {
        this.inputPreguntas.push(new FormControl( 'si' , Validators.required));
      }
      this.auxArray.push(this.inputPreguntas);
      this.inputPreguntas = [];
    }
  }


  submitForm() {
    let initialState: {};
    if (this.forma.valid && this.loginAux.cedula !== '') {
    this.formValue = this.forma.value;
    this.formValue['cedula'] = this.loginAux.cedula;
    this.submitState = 'En proceso';
    this.encuesta.insertCat(this.formValue).subscribe(data => {
      this.submitState = 'Submit';
      initialState = {
        list: [],
        title: 'Success'
      };
      this.bsModalRef = this.modalService.show(ModalComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
    },
    err => {
      initialState = {
        list: [],
        title: 'Fail'
      };
      this.bsModalRef = this.modalService.show(ModalComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
      console.log(`Error occured: ${err.message}`);
    });

  } else {
    console.log('los campos son requeridos');
  }
  }


  ngOnInit() {
    this.loginService.currentMessage.subscribe(data => this.loginAux = data);
  }

  openModal = () => {
    const initialState = {
      list: [],
      title: 'Login'
    };
    this.bsModalRef = this.modalService.show(ModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
