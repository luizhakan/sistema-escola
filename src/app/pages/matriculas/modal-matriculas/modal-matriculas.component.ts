import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CursosService } from '../../cursos/cursos.service';
import { AlunosService } from '../../alunos/alunos.service';
import { Cursos } from '../../../components/tabela/interfaces-tabela';
import { CursoMatricula } from '../interface';
import { MatDialog } from '@angular/material/dialog';
import { MatriculasService } from '../matriculas.service';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modal-matriculas',
  templateUrl: './modal-matriculas.component.html',
  styleUrl: './modal-matriculas.component.css',
})
export class ModalMatriculasComponent {
  formMatricula: FormGroup;
  data: Date = new Date();
  matricula!: CursoMatricula;
  cursos: Cursos[] = this.cursosService.cursos;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private alunosService: AlunosService,
    private matriculasService: MatriculasService,
    private dialog: MatDialog
  ) {
    this.formMatricula = this.fb.group({
      codigoDoCurso: this.cursos[0].codigo,
      codigoDoAluno: this.alunosService.alunos[0].codigo,
      codigoMatricula: [uuidv4(), Validators.required],
      dataMatricula: [
        formatDate(this.data, 'yyyy-MM-dd', 'en-US'),
        [Validators.required, this.dateValidator(this.cursos[0].dataInicio)],
      ],
    });
  }

  dateValidator(cursoStartDate: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const matriculaDate = new Date(control.value);
      const initialDate = new Date(cursoStartDate);
      // Subtrai um mês da data inicial do curso
      initialDate.setMonth(initialDate.getMonth() - 1);

      const forbidden = matriculaDate < initialDate;
      return forbidden ? { forbiddenDate: { value: control.value } } : null;
    };
  }

onSubmit() {
  const formValue = this.formMatricula.value;

  if (this.matricula) {
    this.matricula = { ...this.matricula, ...formValue };
    this.matriculasService.atualizarMatricula(this.matricula as CursoMatricula);
  } else {
    this.matricula = { ...formValue };
    const codigoDoCurso = this.formMatricula.get('codigoDoCurso')?.value;
    this.matriculasService.criarMatricula(
      this.matricula.codigoDoAluno,
      codigoDoCurso
    );
  }
  console.log(formValue);
}


  onClose() {
    if (this.dialog) {
      this.dialog.closeAll();
    }
  }

  onCursoChange(event: any) {
    console.log(event);
    const selectedCurso = this.cursos.find((c) => c.codigo === event.value);
    this.formMatricula.get('codigoDoCurso')?.setValue(selectedCurso?.codigo);
  }
}
