/**
 * Serviço responsável por gerenciar os cursos.
 */
import { ModalCursosComponent } from './modal-cursos/modal-cursos.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cursos } from '../../components/tabela/interfaces-tabela';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  static setEstado(setEstado: any) {
    throw new Error('Method not implemented.');
  }
  static setCursoSelecionado(setCursoSelecionado: any) {
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
  cursoSelecionado: Cursos | null = null;

  /**
   * Define o curso selecionado.
   * @param curso O curso a ser definido.
   */
  setCursoSelecionado(curso: Cursos | null) {
    this.cursoSelecionado = curso;
  }

  /**
   * Abre o modal para adicionar ou editar um curso.
   */
  openDialog() {
    this.dialog.open(ModalCursosComponent);
  }

  /**
   * Lista de cursos armazenados na localStorage.
   */
  cursos: Cursos[] = JSON.parse(localStorage.getItem('cursos') || '[]');

  /**
   * Cria um novo curso e o adiciona na localStorage.
   * @param curso O curso a ser criado.
   */
  criarCurso(curso: Cursos) {
    this.cursos = [...this.cursos, curso];

    localStorage.setItem('cursos', JSON.stringify(this.cursos));
  }

  /**
   * Atualiza um curso na localStorage.
   * @param curso O curso a ser atualizado.
   */
  atualizarCurso(curso: Cursos) {
    const index = this.cursos.findIndex((c) => c.codigo === curso.codigo);
    if (index !== -1) {
      this.cursos[index] = curso;
      localStorage.setItem('cursos', JSON.stringify(this.cursos));
    }
  }

  /**
   * Exclui um ou mais cursos da localStorage.
   * @param cursos Os cursos a serem excluídos.
   */
  excluirCurso(cursos: Cursos[]) {
    this.cursos = this.cursos.filter(
      (c) => !cursos.some((curso) => curso.codigo === c.codigo)
    );

    localStorage.setItem('cursos', JSON.stringify(this.cursos));
  }

  obterNomeDoCurso(codigo: string): string | undefined {
    const cursoEncontrado = this.cursos.find((c) => c.codigo.toString() === codigo);
    return cursoEncontrado?.nome;
  }

}
