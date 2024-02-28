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

  estadoAtual: 'Incluir' | 'Alterar' = 'Incluir';
  cursoSelecionado: Cursos | null = null;
  cursos: Cursos[] = JSON.parse(localStorage.getItem('cursos') || '[]');

  /**
   * Define a propriedade estadoAtual para o valor de estado fornecido.
   *
   * @param {'Incluir' | 'Alterar'} estado - O valor de estado a ser definido
   * @return {void}
   */
  setEstado(estado: 'Incluir' | 'Alterar') {
    this.estadoAtual = estado;
  }

  /**
   * Define o curso selecionado.
   *
   * @param {Cursos | null} curso - o curso a ser definido como selecionado
   * @return {void}
   */
  setCursoSelecionado(curso: Cursos | null) {
    this.cursoSelecionado = curso;
  }

  /**
   * Abre um diálogo com o ModalCursosComponent.
   */
  openDialog() {
    this.dialog.open(ModalCursosComponent);
  }

  /**
   * criarCurso - Uma função que adiciona um novo curso à lista de cursos e salva a lista atualizada no armazenamento local.
   *
   * @param {Cursos} curso - O objeto de curso a ser adicionado à lista.
   * @return {void}
   */
  criarCurso(curso: Cursos) {
    this.cursos = [...this.cursos, curso];

    localStorage.setItem('cursos', JSON.stringify(this.cursos));
  }

  /**
   * Atualiza o curso com o objeto curso fornecido no array de cursos e armazena o array de cursos atualizado no armazenamento local.
   *
   * @param {Cursos} curso - o objeto curso a ser atualizado
   */
  atualizarCurso(curso: Cursos) {
    const index = this.cursos.findIndex((c) => c.codigo === curso.codigo);
    if (index !== -1) {
      this.cursos[index] = curso;
      localStorage.setItem('cursos', JSON.stringify(this.cursos));
    }
  }

  /**
   * Filtra os cursos especificados da lista existente de cursos e atualiza o armazenamento local com a lista modificada.
   *
   * @param {Cursos[]} cursos - a lista de cursos a serem excluídos
   * @return {void}
   */
  excluirCurso(cursos: Cursos[]) {
    this.cursos = this.cursos.filter(
      (c) => !cursos.some((curso) => curso.codigo === c.codigo)
    );

    localStorage.setItem('cursos', JSON.stringify(this.cursos));
  }

  /**
   * Obtém o nome do curso com base no código fornecido.
   *
   * @param {string} codigo - O código do curso a ser pesquisado
   * @return {string | undefined} O nome do curso encontrado, ou undefined se não for encontrado
   */
  obterNomeDoCurso(codigo: string): string | undefined {
    const cursoEncontrado = this.cursos.find(
      (c) => c.codigo.toString() === codigo
    );
    return cursoEncontrado?.nome;
  }
}
