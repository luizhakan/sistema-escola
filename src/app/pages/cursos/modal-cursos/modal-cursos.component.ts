/**
 * Componente responsável por exibir o modal de cursos.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cursos } from '../../../components/tabela/interfaces-tabela';
import { CursosService } from '../cursos.service';

import { v4 as uuidv4 } from 'uuid';
import { DOCUMENT, formatDate } from '@angular/common';

@Component({
  selector: 'app-modal-cursos',
  templateUrl: './modal-cursos.component.html',
  styleUrls: ['./modal-cursos.component.css'],
})
export class ModalCursosComponent implements OnInit {
  formCurso: FormGroup;
  data: Date = new Date();

  cursos: Cursos | null = null;
  modalTitle: string = 'Curso - Editar';

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.formCurso = this.fb.group({
      nome: ['', Validators.required],
      instrutor: ['', Validators.required],
      local: ['', Validators.required],
      cargaHoraria: ['', Validators.required],
      dataInicio: [
        formatDate(this.data, 'yyyy/MM/dd', 'en-US'),
        Validators.required,
      ],
    });
  }

  ngOnInit() {
    this.modalTitle = `Curso - ${this.cursosService.estadoAtual}`;
    this.cursos = this.cursosService.cursoSelecionado;
    if (this.cursos) {
      const { nome, instrutor, local, cargaHoraria, dataInicio } = this.cursos;
      this.formCurso.setValue({
        nome,
        instrutor,
        local,
        cargaHoraria,
        dataInicio,
      });
    } else {
      this.formCurso.reset();
    }
  }

  onSubmit() {
    const formValue = this.formCurso.value;

    if (this.cursos) {
      this.cursos = { ...this.cursos, ...formValue };
      this.cursosService.atualizarCurso(this.cursos as Cursos);
    } else {
      this.cursos = { codigo: uuidv4(), ...formValue };
      this.cursosService.criarCurso(this.cursos as Cursos);
    }

    window.location.reload();
    this.onClose();
  }

  /**
   * Fecha o modal.
   */
  onClose() {
    if (this.dialog) {
      this.dialog.closeAll();
    }
  }
}
