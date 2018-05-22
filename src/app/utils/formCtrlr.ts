import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

export class FormCtrlr {

  inputPreguntas: FormControl[] = [];
  enunciados: any[];
  auxArray: any [] = [];
  constructor(params: any[]) {
        this.enunciados = params;
    }

    formBuilder(): FormGroup {
        this.organizeRadioObjects();
        return new FormGroup(this.createFormOjb());
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
}
