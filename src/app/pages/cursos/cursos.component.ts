/**
 * Componente responsável por exibir a lista de cursos.
 */
import { Component, ViewChild } from '@angular/core';
import { Alunos, Cursos } from '../../components/tabela/interfaces-tabela';
import { MatTableDataSource } from '@angular/material/table';
import { TabelaComponent } from '../../components/tabela/tabela.component';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
})
export class CursosComponent {
  @ViewChild(TabelaComponent) tabela: TabelaComponent | undefined;

  valorDoFiltro: string;
  disabledIncluir: boolean = false;
  disabledAlterar: boolean = true;
  disabledExcluir: boolean = true;
  dados: Cursos[] = this.cursosService.cursos;
  displayedColumnsWithSelect: string[] = [
    'codigo',
    'nome',
    'instrutor',
    'local',
    'cargaHoraria',
    'dataInicio',
  ];
  displayedColumns: string[] = [
    'codigo',
    'nome',
    'instrutor',
    'local',
    'cargaHoraria',
    'dataInicio',
  ];
  dataSource = new MatTableDataSource<Cursos | Alunos>(this.dados);

  /**
   * Construtor para a classe CursosService.
   *
   * @param {CursosService} cursosService - instância de CursosService
   * @return {void}
   */
  constructor(public cursosService: CursosService) {
    this.valorDoFiltro = '';
  }

  /**
   * Uma função para validar as linhas selecionadas na tabela.
   */
  validar() {
    let linhasSelecionadas = this.tabela?.selection.selected;
    const qtdLinhasSelecionadas = linhasSelecionadas
      ? linhasSelecionadas.length
      : 0;

    this.disabledIncluir = qtdLinhasSelecionadas !== 0;
    this.disabledAlterar = qtdLinhasSelecionadas !== 1;
    this.disabledExcluir = qtdLinhasSelecionadas === 0;
  }

  /**
   * Uma função que lida com a mudança de um valor de filtro e atualiza a origem de dados conforme necessário.
   *
   * @param {string} valorDoFiltro - o valor do filtro
   * @return {void}
   */
  onFiltroChange(valorDoFiltro: string) {
    const dadosFiltrados = this.cursosService.cursos.filter((curso) =>
      curso.nome.toLowerCase().includes(valorDoFiltro.toLowerCase())
    );
    if (this.dataSource instanceof MatTableDataSource) {
      this.dataSource.data = dadosFiltrados;
    } else {
      this.dataSource = new MatTableDataSource<Cursos | Alunos>(dadosFiltrados);
    }
  }

  /**
   * Descrição da função inteira.
   *
   */
  onIncluirClick(): void {
    let linhasSelecionadas = this.tabela?.selection.selected;

    if (!linhasSelecionadas || linhasSelecionadas.length === 0) {
      this.cursosService.setEstado('Incluir');
      this.cursosService.setCursoSelecionado(null);
      this.cursosService.openDialog();
    }
  }

  /**
   * Uma função que trata o evento de clique para alterar uma linha selecionada.
   *
   * @param {Cursos | Alunos | undefined} linhaSelecionada - os dados da linha selecionada, que podem ser do tipo Cursos, Alunos ou undefined
   * @return {void}
   */
  onAlterarClick(linhaSelecionada: Cursos | Alunos | undefined): void {
    if (this.tabela?.selection.selected?.length !== 1 || !linhaSelecionada) {
      return;
    }
    this.cursosService.setEstado('Alterar');
    this.cursosService.setCursoSelecionado(linhaSelecionada as Cursos);
    this.cursosService.openDialog();
  }

  /**
   * Uma função que manipula o evento de clique para a ação "Excluir".
   *
   * @param {Cursos | Alunos} linhasSelecionadas - um array de itens selecionados, que pode ser do tipo Cursos ou Alunos
   * @return {void}
   */
  onExcluirClick(linhasSelecionadas: (Cursos | Alunos)[]): void {
    if (linhasSelecionadas && linhasSelecionadas.length > 0) {
      this.cursosService.excluirCurso(linhasSelecionadas as Cursos[]);
      this.resetPage();
    }
  }

  /**
   * Reinicia a página desabilitando os botões 'Alterar' e 'Excluir', limpando a seleção da tabela e recarregando a janela.
   *
   * @return {void}
   */
  public resetPage(): void {
    this.disabledAlterar = true;
    this.disabledExcluir = true;
    this.tabela?.selection.clear();
    window.location.reload();
  }
}
