import { Injectable, Input, OnInit } from '@angular/core';
import { AlunosService } from '../alunos/alunos.service';
import { CursosService } from '../cursos/cursos.service';
import { ModalMatriculasComponent } from './modal-matriculas/modal-matriculas.component';
import { MatDialog } from '@angular/material/dialog';
import { Alunos } from '../../components/tabela/interfaces-tabela';
import { CursoMatricula } from './interface';
import { formatDate } from '@angular/common';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  @Input() aluno!: Alunos;
  alunoSelecionado: Alunos | undefined;
  matriculas: CursoMatricula[] = [];
  alunoSelecionadoCodigo: any | null = null;

  /**
   * Construtor para criar uma nova instância de MyClass.
   *
   * @param {AlunosService} alunosService - O serviço para gerenciar os alunos.
   * @param {CursosService} cursosService - O serviço para gerenciar os cursos.
   * @param {MatDialog} dialog - O serviço de diálogo para exibir diálogos.
   */
  constructor(
    private alunosService: AlunosService,
    private cursosService: CursosService,
    private dialog: MatDialog
  ) {}

  /**
   * Abre um diálogo com o aluno selecionado usando o código do aluno.
   *
   * @param {any} codigoDoAluno - o código do aluno a ser selecionado
   */
  openDialog(codigoDoAluno: any) {
    this.alunoSelecionado =
      this.alunosService.obterAlunoPorCodigo(codigoDoAluno);
    console.log('this.alunoSelecionado', this.alunoSelecionado);

    this.dialog.open(ModalMatriculasComponent, {
      data: {
        aluno: this.alunoSelecionado,
      },
    });
  }

  /**
   * Obtém matrículas por código do aluno.
   *
   * @param {string} codigoDoAluno - o código do aluno para filtrar
   * @return {CursoMatricula[]} a lista filtrada de matrículas do curso
   */
  obterMatriculasPorCodigoAluno(codigoDoAluno: string): CursoMatricula[] {
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');

    console.log('Código do aluno para filtro:', codigoDoAluno);

    return matriculas.filter(
      (matricula: any) => matricula.codigoDoAluno === codigoDoAluno
    );
  }

  /**
   * Cria uma nova matrícula com os códigos do aluno e do curso fornecidos e adiciona à lista de matrículas.
   *
   * @param {string} codigoDoAluno - o código do aluno
   * @param {string} codigoDoCurso - o código do curso
   * @return {void}
   */
  criarMatricula(codigoDoAluno: string, codigoDoCurso: string) {
    const novaMatricula: CursoMatricula = {
      codigoMatricula: uuidv4(),
      codigoDoAluno: codigoDoAluno, // Utiliza diretamente o código do aluno
      codigoDoCurso: [{ codigo: codigoDoCurso }],
      dataMatricula: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    };

    this.matriculas.push(novaMatricula);
    localStorage.setItem('matriculas', JSON.stringify(this.matriculas));
  }

  /**
   * Atualiza a matrícula do curso fornecida no armazenamento local.
   *
   * @param {CursoMatricula} matricula - a matrícula do curso a ser atualizada
   * @return {void}
   */
  atualizarMatricula(matricula: CursoMatricula) {
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const codigoMatricula = matricula.codigoMatricula;

    const index = matriculas.findIndex(
      (m: any) => m.codigoMatricula === codigoMatricula
    );

    matriculas[index] = matricula;
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
  }

  /**
   * Uma função para obter matrículas.
   *
   * @return {Array} a lista de matrículas
   */
  obterMatriculas() {
    this.matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');

    return this.matriculas;
  }

  /**
   * Uma função para obter matrículas do curso para um aluno específico.
   *
   * @return {CursoMatricula[]} array de matrículas do curso
   */
  obterMatriculasPorAluno(): CursoMatricula[] {
    const codigoAluno = this.alunoSelecionado?.codigo;
    if (codigoAluno) {
      console.log('Código do aluno para filtro:', codigoAluno);
      return this.obterMatriculasPorCodigoAluno(codigoAluno.toString());
    } else {
      console.log('Código do aluno não disponível.');
      return [];
    }
  }

  /**
   * Função para excluir uma matrícula do armazenamento local.
   *
   * @param {CursoMatricula} matricula - a matrícula a ser excluída
   * @return {void}
   */
  excluirMatricula(matricula: CursoMatricula) {
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const index = matriculas.findIndex(
      (m: any) => m.codigoMatricula === matricula.codigoMatricula
    );
    matriculas.splice(index, 1);
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
  }

  /**
   * Método para excluir todas as matrículas.
   */
  excluirTodasMatriculas() {
    localStorage.removeItem('matriculas');
  }
}
