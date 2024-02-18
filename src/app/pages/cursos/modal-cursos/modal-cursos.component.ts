/**
 * Componente responsável por exibir o modal de cursos.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cursos } from '../../../components/tabela/interfaces-tabela';
import { CursosService } from '../cursos.service';

import { v4 as uuidv4 } from 'uuid';

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
    private fb: FormBuilder
  ) {
    /**
     * Inicializa o formulário do curso com os campos vazios e as validações necessárias.
     */
    this.formCurso = this.fb.group({
      nome: ['', Validators.required],
      instrutor: ['', Validators.required],
      local: ['', Validators.required],
      cargaHoraria: ['', Validators.required],
      dataInicio: [
        `${this.data.getFullYear()}/${
          this.data.getMonth() + 1
        }/${this.data.getDate()}`,
        Validators.required,
      ],
    });
  }

  ngOnInit() {
    /**
     * Define o título do modal com base no estado atual do serviço de cursos.
     * Obtém o curso selecionado do serviço de cursos e preenche o formulário com seus dados, se existir.
     * Caso contrário, reseta o formulário.
     */
    this.modalTitle = `Curso - ${this.cursosService.estadoAtual}`;
    this.cursos = this.cursosService.cursoSelecionado;
    if (this.cursos) {
      this.formCurso.setValue({
        nome: this.cursos.nome,
        instrutor: this.cursos.instrutor,
        local: this.cursos.local,
        cargaHoraria: this.cursos.cargaHoraria,
        dataInicio: this.cursos.dataInicio,
      });
    } else {
      this.formCurso.reset();
    }
  }

  /**
   * Manipula o evento de envio do formulário.
   * Atualiza o curso existente com os dados do formulário, se existir.
   * Caso contrário, cria um novo curso com os dados do formulário.
   * Recarrega a página e fecha o modal.
   */
  onSubmit() {
    if (this.cursos) {
      this.cursos.nome = this.formCurso.value.nome;
      this.cursos.instrutor = this.formCurso.value.instrutor;
      this.cursos.local = this.formCurso.value.local;
      this.cursos.cargaHoraria = this.formCurso.value.cargaHoraria;
      this.cursos.dataInicio = this.formCurso.value.dataInicio;

      this.cursosService.atualizarCurso(this.cursos as Cursos);
    } else {
      this.cursos = {
        codigo: uuidv4(),
        ...this.formCurso.value,
      };
      this.cursosService.criarCurso(this.cursos as Cursos);
    }

    window.location.reload();
    this.onClose();
  }

  /**
   * Fecha o modal.
   */
  onClose() {
    this.dialog?.closeAll();
  }
}
