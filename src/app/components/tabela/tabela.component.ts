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

  getLinhaSelecionadas(): Cursos | Alunos | undefined {
    const linhaSelecionada = this.selection.selected[0] || undefined;
    this.linhaSelecionada.emit(linhaSelecionada);
    return linhaSelecionada;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
    this.selecionarTodos.emit(this.selection.selected);
  }

  /**
   * Construtor padrão.
   */
  constructor() {}

  /**
   * Array de dados que serão exibidos na tabela.
   */
  dados: Cursos[] | Alunos[] = [];

  /**
   * Array de strings que define as colunas que serão exibidas na tabela.
   */
  @Input() displayedColumns: string[] = [];

  /**
   * Array de strings que define as colunas que serão exibidas na tabela, incluindo a coluna de seleção.
   */
  displayedColumnsWithSelect: string[] = ['select', ...this.displayedColumns];

  /**
   * MatTableDataSource que contém os dados que serão exibidos na tabela.
   */
  @Input() dataSource = new MatTableDataSource<any>([]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['displayedColumns']) {
      this.displayedColumnsWithSelect = [
        'select',
        ...changes['displayedColumns'].currentValue,
      ];
    }
  }

  /**
   * SelectionModel que é usado para controlar a seleção de linhas na tabela.
   */
  selection = new SelectionModel<Cursos | Alunos>(true, []);

  /**
   * Método que verifica se todas as linhas na tabela estão selecionadas.
   * @returns Um booleano indicando se todas as linhas estão selecionadas.
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Método que alterna a seleção de todas as linhas na tabela.
   */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  /**
   * Método que retorna a label para a checkbox de uma linha.
   * @param row A linha para a qual a label será retornada.
   * @returns Uma string que é a label para a checkbox da linha.
   */
  checkboxLabel(row?: Cursos): string {
    return !row
      ? `${this.isAllSelected() ? 'deselect' : 'select'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
          row.codigo + 1
        }`;
  }

  /**
   * Método que converte uma string de camelCase para Title Case.
   * @param camelCase A string em camelCase que será convertida.
   * @returns A string convertida em Title Case.
   */
  camelCaseToTitleCase(camelCase: string): string {
    return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
  }

  /**
   * Método que retorna as linhas selecionadas na tabela.
   * @returns Um array das linhas selecionadas.
   */
  getLinhasSelecionadas(): (Cursos | Alunos)[] {
    return this.selection.selected;
  }
}
