import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alunos } from '../../components/tabela/interfaces-tabela';
import { ModalAlunosComponent } from './modal-alunos/modal-alunos.component';

@Injectable({
  providedIn: 'root',
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

  estadoAtual: 'Incluir' | 'Alterar' = 'Incluir';
  alunos: Alunos[] = JSON.parse(localStorage.getItem('alunos') || '[]');
  alunoSelecionado: Alunos | null = null;

  /**
   * Define a propriedade estadoAtual para o estado especificado.
   *
   * @param {string} estado - o estado a ser definido ('Incluir' ou 'Alterar')
   */
  setEstado(estado: 'Incluir' | 'Alterar') {
    this.estadoAtual = estado;
  }

  /**
   * Define o aluno selecionado.
   *
   * @param {Alunos | null} aluno - o aluno a ser definido como selecionado
   */
  setAlunoSelecionado(aluno: Alunos | null) {
    this.alunoSelecionado = aluno;
  }

  /**
   * Abre um diálogo com o ModalAlunosComponent.
   */
  openDialog() {
    this.dialog.open(ModalAlunosComponent);
  }

  /**
   * Cria um novo aluno e armazena no local storage
   *
   * @param {Alunos} aluno - o aluno a ser criado
   * @return {void}
   */
  criarAluno(aluno: Alunos) {
    this.alunos = [...this.alunos, aluno];

    localStorage.setItem('alunos', JSON.stringify(this.alunos));
  }

  /**
   * Atualiza um aluno na lista de alunos.
   *
   * @param {Alunos} aluno - o aluno a ser atualizado
   */
  atualizarAluno(aluno: Alunos) {
    const index = this.alunos.findIndex((c) => c.codigo === aluno.codigo);
    if (index !== -1) {
      this.alunos[index] = aluno;
      localStorage.setItem('alunos', JSON.stringify(this.alunos));
    }
  }

  /**
   * Exclui os alunos fornecidos da lista de alunos e atualiza o armazenamento local.
   *
   * @param {Alunos[]} alunos - A lista de alunos a serem excluídos
   */
  excluirAluno(alunos: Alunos[]) {
    this.alunos = this.alunos.filter(
      (c) => !alunos.some((aluno) => aluno.codigo === c.codigo)
    );

    localStorage.setItem('alunos', JSON.stringify(this.alunos));
  }

  /**
   * Obtém um aluno pelo código.
   *
   * @param {string} codigo - o código do aluno a ser obtido
   * @return {type} o aluno com o código correspondente, se encontrado
   */
  obterAlunoPorCodigo(codigo: string) {
    return this.alunos.find((aluno) => aluno.codigo.toString() === codigo);
  }
}
