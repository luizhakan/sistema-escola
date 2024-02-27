import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alunos } from '../../components/tabela/interfaces-tabela';
import { ModalAlunosComponent } from './modal-alunos/modal-alunos.component';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  static setEstado(setEstado: any) {
    throw new Error('Method not implemented.');
  }
  static setAlunoSelecionado(setAlunoSelecionado: any) {
    throw new Error('Method not implemented.');
  }
  static openDialog(openDialog: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private dialog: MatDialog) {}

  /**
   * Estado atual do serviço.
   */
  estadoAtual: 'Incluir' | 'Alterar' = 'Incluir';

  /**
   * Define o estado atual do serviço.
   * @param estado O estado a ser definido. Deve ser 'Incluir' ou 'Alterar'.
   */
  setEstado(estado: 'Incluir' | 'Alterar') {
    this.estadoAtual = estado;
  }

  /**
   * Curso selecionado.
   */
  alunoSelecionado: Alunos | null = null;

  /**
   * Define o curso selecionado.
   * @param curso O curso a ser definido.
   */
  setAlunoSelecionado(aluno: Alunos | null) {
    this.alunoSelecionado = aluno;
  }

  /**
   * Abre o modal para adicionar ou editar um curso.
   */
  openDialog() {
    this.dialog.open(ModalAlunosComponent);
  }

  /**
   * Lista de cursos armazenados na localStorage.
   */
  alunos: Alunos[] = JSON.parse(localStorage.getItem('alunos') || '[]');

  /**
   * Cria um novo curso e o adiciona na localStorage.
   * @param curso O curso a ser criado.
   */
  criarAluno(aluno: Alunos) {
    this.alunos = [...this.alunos, aluno];

    localStorage.setItem('alunos', JSON.stringify(this.alunos));
  }

  /**
   * Atualiza um curso na localStorage.
   * @param curso O curso a ser atualizado.
   */
  atualizarAluno(aluno: Alunos) {
    const index = this.alunos.findIndex((c) => c.codigo === aluno.codigo);
    if (index !== -1) {
      this.alunos[index] = aluno;
      localStorage.setItem('alunos', JSON.stringify(this.alunos));
    }
  }

  /**
   * Exclui um ou mais cursos da localStorage.
   * @param cursos Os cursos a serem excluídos.
   */
  excluirAluno(alunos: Alunos[]) {
    this.alunos = this.alunos.filter(
      (c) => !alunos.some((aluno) => aluno.codigo === c.codigo)
    );

    localStorage.setItem('alunos', JSON.stringify(this.alunos));
  }

  obterAlunoPorCodigo(codigo: number) {
    return this.alunos.find((aluno) => aluno.codigo === codigo);
  }
}
