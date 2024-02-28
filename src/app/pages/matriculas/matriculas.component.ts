import { Component, OnInit, ViewChild } from '@angular/core';
import { MatriculasService } from './matriculas.service';
import { AlunosService } from '../alunos/alunos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Alunos, Cursos } from '../../components/tabela/interfaces-tabela';
import { TabelaComponent } from '../../components/tabela/tabela.component';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css'],
})
export class MatriculasComponent implements OnInit {
  @ViewChild(TabelaComponent) tabela: TabelaComponent | undefined;

  valorDoFiltro: string = '';
  dados: Alunos[] = this.alunosService.alunos;
  disabledVerMatricula: boolean = true;
  disabledMatricular: boolean = true;
  disabledExcluir: boolean = true;

  dataSource = new MatTableDataSource<Cursos | Alunos>(this.dados);
  alunoSelecionado: Alunos | undefined;

  displayedColumns = ['codigo', 'nome', 'dataNascimento'];

  /**
   * Construtor para criar uma instância da classe.
   *
   * @param {MatriculasService} matriculasService - serviço para matriculas
   * @param {AlunosService} alunosService - serviço para alunos
   */
  constructor(
    private matriculasService: MatriculasService,
    private alunosService: AlunosService
  ) {}

  ngOnInit(): void {}

  /**
   * Manipula o evento de clique para visualizar matrículas de alunos.
   */
  onVerMatriculasClick() {
    if (this.tabela?.selection.selected.length === 1) {
      const codigoDoAlunoSelecionado = String(
        this.tabela.selection.selected[0]
      );
      this.alunoSelecionado = this.alunosService.obterAlunoPorCodigo(
        codigoDoAlunoSelecionado.toString()
      );
    }
  }

  /**
   * Manipula o evento de mudança do filtro.
   *
   * @param {string} event - o novo valor do filtro
   */
  onFiltroChange(event: string) {
    this.valorDoFiltro = event;
    if (this.tabela) {
      this.tabela.alunoSelecionadoCodigo =
        this.alunosService.alunoSelecionado?.codigo;
    }
  }

  /**
   * Uma função para validar as linhas selecionadas e atualizar o estado desabilitado de vários botões.
   */
  validar() {
    let linhasSelecionadas = this.tabela?.selection.selected;
    const qtdLinhasSelecionadas = linhasSelecionadas
      ? linhasSelecionadas.length
      : 0;

    this.disabledVerMatricula = qtdLinhasSelecionadas !== 1;
    this.disabledMatricular = qtdLinhasSelecionadas !== 1;
    this.disabledExcluir = qtdLinhasSelecionadas === 0;

    if (this.tabela) {
      this.tabela.alunoSelecionadoCodigo = this.alunoSelecionado?.codigo;
    }
  }

  /**
   * Manipula o evento de clique para matricular.
   */
  onMatricularClick() {
    if (this.tabela?.selection.selected.length === 1) {
      const codigoDoAlunoSelecionado = String(
        this.tabela.selection.selected[0]
      );
      this.alunoSelecionado = this.alunosService.obterAlunoPorCodigo(
        codigoDoAlunoSelecionado.toString()
      );

      this.matriculasService.openDialog(codigoDoAlunoSelecionado);
    } else {
      console.log('Nenhum aluno selecionado para matricular.');
    }
  }
}
