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

  constructor(
    private alunosService: AlunosService,
    private cursosService: CursosService,
    private dialog: MatDialog
  ) {}

  alunoSelecionado: any = null;

  openDialog(codigoDoAluno: any) {
    this.alunoSelecionado = this.alunosService.obterAlunoPorCodigo(codigoDoAluno);
    console.log("this.alunoSelecionado", this.alunoSelecionado);

    this.dialog.open(ModalMatriculasComponent, {
      data: {
        aluno: this.alunoSelecionado,
      },
    });
  }


  // Array para armazenar as matrículas
  matriculas: CursoMatricula[] = [];

  // Método para criar uma nova matrícula
  criarMatricula(codigoDoAluno: string, codigoDoCurso: string) {
    // Cria um novo objeto do tipo 'CursoMatricula'
    const novaMatricula: CursoMatricula = {
      codigoMatricula: uuidv4(),
      codigoDoAluno: codigoDoAluno, // Utiliza diretamente o código do aluno
      codigoDoCurso: [{ codigo: codigoDoCurso }],
      dataMatricula: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    };

    // Adiciona a nova matrícula ao array de matrículas
    this.matriculas.push(novaMatricula);

    // Atualiza a localStorage
    localStorage.setItem('matriculas', JSON.stringify(this.matriculas));
  }


  atualizarMatricula(matricula: CursoMatricula) {
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    // capturar código da matricula
    const codigoMatricula = matricula.codigoMatricula;

    // encontrar a matricula
    const index = matriculas.findIndex(
      (m: any) => m.codigoMatricula === codigoMatricula
    );

    // atualizar a matricula
    matriculas[index] = matricula;
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
  }

  // Método para obter a lista de matrículas
  obterMatriculas() {
    this.matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');

    return this.matriculas;
  }

  obterMatriculasPorAluno(): CursoMatricula[] {
    const codigoAluno = this.alunoSelecionado?.codigo;
    if (codigoAluno) {
      console.log("Código do aluno para filtro:", codigoAluno);
      return this.matriculas.filter(matricula => matricula.codigoDoAluno === codigoAluno);
    } else {
      console.log("Código do aluno não disponível.");
      return [];
    }
  }




  alunoSelecionadoCodigo: any | null = null;

  // Método para excluir uma matrícula
  excluirMatricula(matricula: CursoMatricula) {
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const index = matriculas.findIndex(
      (m: any) => m.codigoMatricula === matricula.codigoMatricula
    );
    matriculas.splice(index, 1);
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
  }

  // Método para excluir todas as matrículas
  excluirTodasMatriculas() {
    localStorage.removeItem('matriculas');
  }
}
