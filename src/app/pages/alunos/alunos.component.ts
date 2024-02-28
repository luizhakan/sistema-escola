import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alunos, Cursos } from '../../components/tabela/interfaces-tabela';
import { AlunosService } from './alunos.service';
import { TabelaComponent } from '../../components/tabela/tabela.component';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css',
})
export class AlunosComponent {
  @ViewChild(TabelaComponent) tabela: TabelaComponent | undefined;

  valorDoFiltro: string;
  displayedColumns: string[] = ['codigo', 'nome', 'dataNascimento'];

  disabledIncluir: boolean = false;
  disabledAlterar: boolean = true;
  disabledExcluir: boolean = true;
  dados: Alunos[] = this.alunosService.alunos;

  dataSource = new MatTableDataSource<Alunos>(this.dados);

  /**
   * Construtor para inicializar AlunosService.
   *
   * @param {AlunosService} alunosService - instância de AlunosService para injeção de dependência
   * @return {void}
   */
  constructor(private alunosService: AlunosService) {
    this.valorDoFiltro = '';
  }

  /**
   * Manipula o evento de mudança do filtro de entrada e atualiza a origem dos dados conforme necessário.
   *
   * @param {string} valorDoFiltro - o valor do filtro de entrada
   * @return {void}
   */
  onFiltroChange(valorDoFiltro: string) {
    const dadosFiltrados = this.alunosService.alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(valorDoFiltro.toLowerCase())
    );
    if (this.dataSource instanceof MatTableDataSource) {
      this.dataSource.data = dadosFiltrados;
    } else {
      this.dataSource = new MatTableDataSource<Alunos>(dadosFiltrados);
    }
  }

  /**
   * Esta função lida com o evento de clique para a ação "Incluir". Ela recupera as linhas selecionadas da tabela,
   * define o estado para "Incluir", define o aluno selecionado como nulo, e abre um modal se nenhuma linha estiver selecionada.
   */
  onIncluirClick(): void {
    let linhasSelecionadas = this.tabela?.selection.selected;

    if (!linhasSelecionadas || linhasSelecionadas.length === 0) {
      this.alunosService.setEstado('Incluir');
      this.alunosService.setAlunoSelecionado(null);
      // Abra o modal aqui
      this.alunosService.openDialog();
    }
  }

  /**
   * Manipula o evento de clique para a ação de alterar.
   *
   * @param {Cursos | Alunos | undefined} linhaSelecionada - a linha selecionada, que pode ser do tipo Cursos, Alunos ou undefined
   * @return {void}
   */
  onAlterarClick(linhaSelecionada: Cursos | Alunos | undefined): void {
    if (this.tabela?.selection.selected?.length !== 1 || !linhaSelecionada) {
      return;
    }
    this.alunosService.setEstado('Alterar');
    this.alunosService.setAlunoSelecionado(linhaSelecionada as Alunos);
    this.alunosService.openDialog();
  }

  /**
   * Uma função que lida com o evento de clique para a ação "Excluir".
   *
   * @param {Cursos | Alunos[]} linhasSelecionadas - um array de itens selecionados, que podem ser Cursos ou Alunos
   * @return {void}
   */
  onExcluirClick(linhasSelecionadas: (Cursos | Alunos)[]): void {
    if (linhasSelecionadas && linhasSelecionadas.length > 0) {
      this.alunosService.excluirAluno(linhasSelecionadas as Alunos[]);
      this.resetPage();
    }
  }

  /**
   * Reseta a página, desabilitando 'alterar' e 'excluir', limpando a seleção na tabela e recarregando a janela.
   *
   */
  public resetPage(): void {
    this.disabledAlterar = true;
    this.disabledExcluir = true;
    this.tabela?.selection.clear();
    window.location.reload();
  }

  /**
   * Descrição da função inteira.
   *
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
}
