import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alunos, Cursos } from './interfaces-tabela';
import { CursoMatricula } from '../../pages/matriculas/interface';

/**
 * TabelaComponent é um componente Angular que exibe uma tabela de dados.
 * Este componente implementa a interface OnChanges para reagir às mudanças nas propriedades de entrada.
 */
@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  @Output() linhaSelecionada = new EventEmitter();
  @Output() selecionarTodos = new EventEmitter();
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource<any>([]);

  dados: any[] = [];
  alunoSelecionadoCodigo: any = null;
  displayedColumnsWithSelect: string[] = ['select', ...this.displayedColumns];
  selection = new SelectionModel<Cursos | Alunos | CursoMatricula>(true, []);

  constructor() {}

  /**
   * Esta função é chamada quando as propriedades de entrada do componente são alteradas.
   *
   * @param {SimpleChanges} changes - um objeto de alterações de propriedade
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['displayedColumns']) {
      this.displayedColumnsWithSelect = [
        'select',
        ...changes['displayedColumns'].currentValue,
      ];
    }
  }

  /**
   * Retorna a linha selecionada da lista de Alunos, Cursos, CursoMatricula ou retorna undefined se nenhuma estiver selecionada.
   *
   * @return {Alunos | Cursos | CursoMatricula | undefined} a linha selecionada da lista, ou undefined se nenhuma estiver selecionada
   */
  getLinhaSelecionadas(): Alunos | Cursos | CursoMatricula | undefined {
    const linhaSelecionada = this.selection.selected[0] || undefined;

    return linhaSelecionada;
  }

  /**
   * Alterna a seleção de todos os itens na fonte de dados.
   */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
    this.selecionarTodos.emit(this.selection.selected);
  }

  /**
   * Uma função para verificar se todos os itens estão selecionados.
   *
   * @return {boolean} true se todos os itens estiverem selecionados, false caso contrário
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Alterna todas as linhas com base no estado de seleção atual.
   *
   */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  /**
   * Gera um rótulo para a caixa de seleção com base na linha fornecida.
   *
   * @param {Cursos} row - a linha para a qual gerar o rótulo
   * @return {string} o rótulo gerado para a caixa de seleção
   */
  checkboxLabel(row?: Cursos): string {
    return !row
      ? `${this.isAllSelected() ? 'deselect' : 'select'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
          row.codigo + 1
        }`;
  }

  /**
   * Converte uma string camelCase para maiúsculas iniciais.
   *
   * @param {string} camelCase - a string camelCase de entrada
   * @return {string} a string em maiúsculas iniciais
   */
  camelCaseToTitleCase(camelCase: string): string {
    return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
  }

  /**
   * Obtém as linhas selecionadas.
   *
   * @return {Cursos | Alunos | CursoMatricula[]} as linhas selecionadas
   */
  getLinhasSelecionadas(): (Cursos | Alunos | CursoMatricula)[] {
    return this.selection.selected;
  }
}
