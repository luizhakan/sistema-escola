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

  constructor(private alunosService: AlunosService) {
    this.valorDoFiltro = '';
  }

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
   * Manipula o evento de clique no botão de alteração.
   * Define o estado como 'Alterar', define o curso selecionado e abre o modal.
   * @param linhaSelecionada A linha selecionada na tabela.
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
   * Manipula o evento de clique no botão de exclusão.
   * Exclui os cursos selecionados, limpa a seleção na tabela e recarrega a página.
   * @param linhasSelecionadas As linhas selecionadas na tabela.
   */
  onExcluirClick(linhasSelecionadas: (Cursos | Alunos)[]): void {
    if (linhasSelecionadas && linhasSelecionadas.length > 0) {
      this.alunosService.excluirAluno(linhasSelecionadas as Alunos[]);
      this.resetPage();
    }
  }

  public resetPage(): void {
    this.disabledAlterar = true;
    this.disabledExcluir = true;
    this.tabela?.selection.clear();
    window.location.reload();
  }

  displayedColumns: string[] = ['codigo', 'nome', 'dataNascimento'];

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

  dados: Alunos[] = this.alunosService.alunos;

  dataSource = new MatTableDataSource<Alunos>(this.dados);
}
