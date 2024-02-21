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

  constructor(public cursosService: CursosService) {
    this.valorDoFiltro = '';
  }

  disabledIncluir: boolean = false;
  disabledAlterar: boolean = true;
  disabledExcluir: boolean = true;

  /**
   * Valida as linhas selecionadas na tabela e atualiza o estado dos botões de inclusão, alteração e exclusão.
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
   * Filtra os dados da tabela com base no valor do filtro.
   * @param valorDoFiltro O valor do filtro a ser aplicado.
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

  // No seu componente CursosComponent
  /**
   * Manipula o evento de clique no botão de inclusão.
   * Define o estado como 'Incluir', limpa o curso selecionado e abre o modal se nenhuma linha estiver selecionada.
   */
  onIncluirClick(): void {
    let linhasSelecionadas = this.tabela?.selection.selected;

    if (!linhasSelecionadas || linhasSelecionadas.length === 0) {
      this.cursosService.setEstado('Incluir');
      this.cursosService.setCursoSelecionado(null);
      // Abra o modal aqui
      this.cursosService.openDialog();
    }
  }

  /**
   * Manipula o evento de clique no botão de alteração.
   * Define o estado como 'Alterar', define o curso selecionado e abre o modal.
   * @param linhaSelecionada A linha selecionada na tabela.
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
 * Manipula o evento de clique no botão de exclusão.
 * Exclui os cursos selecionados, limpa a seleção na tabela e recarrega a página.
 * @param linhasSelecionadas As linhas selecionadas na tabela.
 */
onExcluirClick(linhasSelecionadas: (Cursos | Alunos)[]): void {
  if (linhasSelecionadas && linhasSelecionadas.length > 0) {
    this.cursosService.excluirCurso(linhasSelecionadas as Cursos[]);
    this.resetPage();
  }
}

public resetPage(): void {
  this.disabledAlterar = true;
  this.disabledExcluir = true;
  this.tabela?.selection.clear();
  window.location.reload();
}

  dados: Cursos[] = this.cursosService.cursos;

  // representam as colunas que serão exibidas na tabela.
  displayedColumnsWithSelect: string[] = [
    'codigo',
    'nome',
    'instrutor',
    'local',
    'cargaHoraria',
    'dataInicio',
  ];

  // representam as colunas que serão exibidas na tabela.
  displayedColumns: string[] = [
    'codigo',
    'nome',
    'instrutor',
    'local',
    'cargaHoraria',
    'dataInicio',
  ];

  // está criando uma nova instância de MatTableDataSource com os dados que serão exibidos na tabela.
  dataSource = new MatTableDataSource<Cursos | Alunos>(this.dados);
}
