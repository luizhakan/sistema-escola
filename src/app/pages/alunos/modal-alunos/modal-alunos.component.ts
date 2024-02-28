import { Component, Inject } from '@angular/core';
import { Alunos } from '../../../components/tabela/interfaces-tabela';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlunosService } from '../alunos.service';
import { DOCUMENT, formatDate } from '@angular/common';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modal-alunos',
  templateUrl: './modal-alunos.component.html',
  styleUrl: './modal-alunos.component.css',
})
export class ModalAlunosComponent {
  formAluno: FormGroup;
  data: Date = new Date();

  alunos: Alunos | null = null;
  modalTitle: string = 'Aluno - Editar';

  /**
   * Construtor para inicializar dialog, alunosService e fb.
   *
   * @param {MatDialog} dialog - o serviço de diálogo
   * @param {AlunosService} alunosService - o serviço para gerenciar alunos
   * @param {FormBuilder} fb - o serviço de construção de formulários
   */
  constructor(
    private dialog: MatDialog,
    private alunosService: AlunosService,
    private fb: FormBuilder
  ) {
    this.formAluno = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: [
        formatDate(this.data, 'yyyy/MM/dd', 'en-US'),
        [Validators.required, this.dateValidator()],
      ],
    });
  }

  /**
   * Inicializa o componente com o título do modal com base na propriedade estadoAtual do alunosService,
   * define a propriedade alunos com base na propriedade alunoSelecionado do alunosService, e preenche
   * o formulário formAluno com as propriedades nome e dataNascimento do objeto alunos, se ele existir,
   * caso contrário, reseta o formulário.
   *
   */
  ngOnInit() {
    this.modalTitle = `Aluno - ${this.alunosService.estadoAtual}`;
    this.alunos = this.alunosService.alunoSelecionado;
    if (this.alunos) {
      const { nome, dataNascimento } = this.alunos;
      this.formAluno.setValue({
        nome,
        dataNascimento,
      });
    } else {
      this.formAluno.reset();
    }
  }

  /**
   * Valida o input de data para garantir que tenha pelo menos 8 anos de idade.
   *
   * @return {ValidatorFn} Uma função que valida o input de data
   */
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden =
        new Date(control.value).getFullYear() > new Date().getFullYear() - 8;
      return forbidden ? { forbiddenDate: { value: control.value } } : null;
    };
  }

  /**
   * Manipula o envio do formulário, atualiza ou cria os dados dos 'alunos', recarrega a janela e fecha o formulário.
   */
  onSubmit() {
    const formValue = this.formAluno.value;

    if (this.alunos) {
      this.alunos = { ...this.alunos, ...formValue };
      this.alunosService.atualizarAluno(this.alunos as Alunos);
    } else {
      this.alunos = { codigo: uuidv4(), ...formValue };
      this.alunosService.criarAluno(this.alunos as Alunos);
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
