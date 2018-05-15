import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { EnunciadosService } from '../../services/enunciados.service';
import { Enunciados, Preguntas } from '../common/enunciados';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from '../modal/modal.component';
import { LoginService } from '../../services/login.service';


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
    loginAux: boolean;
  constructor(private _enunciadoService: EnunciadosService,
              private modalService: BsModalService,
              private loginService: LoginService
          ) {
     _enunciadoService.getEnunciados().subscribe(data => {
       this.enunciados = data;
       this.organizeRadioObjects();

       this.forma = new FormGroup(this.createFormOjb());
     });

  }
 createFormOjb = () => {
    let formObj = {};
    for (let i = 0; i < this.enunciados.length; i++) {
      formObj['s' + (i + 1)] = new FormArray(this.auxArray[i]);
    }
    return formObj;
 }

  organizeRadioObjects = () => {
    for (let i = 0; i < this.enunciados.length; i++) {
      for (let j = 0; j < this.enunciados[i].preguntas.length ; j++) {
        this.inputPreguntas.push(new FormControl( '' , Validators.required));
      }
      this.auxArray.push(this.inputPreguntas);
      this.inputPreguntas = [];
    }
  }


  submitForm() {
    console.log(this.forma.value);
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
