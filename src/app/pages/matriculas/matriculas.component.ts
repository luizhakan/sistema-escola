import { Component, OnInit, ViewChild } from '@angular/core';
import { MatriculasService } from './matriculas.service';
import { AlunosService } from '../alunos/alunos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Alunos, Cursos } from '../../components/tabela/interfaces-tabela';
import { TabelaComponent } from '../../components/tabela/tabela.component';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrl: './matriculas.component.css',
})
export class MatriculasComponent implements OnInit {
  @ViewChild(TabelaComponent) tabela: TabelaComponent | undefined;

  valorDoFiltro: string = '';
  dados: Alunos[] = this.alunosService.alunos;
  disabledVerMatricula: boolean = true;
  disabledMatricular: boolean = true;
  disabledExcluir: boolean = true;

  dataSource = new MatTableDataSource<Cursos | Alunos>(this.dados);
  alunoSelecionadoCodigo: any | null = null;

  displayedColumns = ['codigo', 'nome', 'dataNascimento'];

  constructor(
    private matriculasService: MatriculasService,
    private alunosService: AlunosService
  ) {}

  ngOnInit(): void {

  }

  onVerMatriculasClick() {
    if (this.tabela?.selection.selected.length === 1) {
      const codigoDoAlunoSelecionado = String(this.tabela.selection.selected[0].codigo);
      console.log("Código do aluno selecionado:", codigoDoAlunoSelecionado);
      this.alunoSelecionadoCodigo = codigoDoAlunoSelecionado;
    }
  }



  onFiltroChange(event: string) {
    this.valorDoFiltro = event;
    if (this.tabela) {
      this.tabela.alunoSelecionadoCodigo = this.alunosService.alunoSelecionado?.codigo;
    }
  }

  /**
   * Valida as linhas selecionadas na tabela e atualiza o estado dos botões de inclusão, alteração e exclusão.
   */
  validar() {
    let linhasSelecionadas = this.tabela?.selection.selected;
    const qtdLinhasSelecionadas = linhasSelecionadas ? linhasSelecionadas.length : 0;

    this.disabledVerMatricula = qtdLinhasSelecionadas !== 1;
    this.disabledMatricular = qtdLinhasSelecionadas !== 1;
    this.disabledExcluir = qtdLinhasSelecionadas === 0;

    // Adicione esta linha para obter o código do aluno selecionado
    const codigoDoAlunoSelecionado = this.alunosService.alunoSelecionado?.codigo;
    if (codigoDoAlunoSelecionado) {
      this.alunoSelecionadoCodigo = codigoDoAlunoSelecionado;
    }


  }

  onMatricularClick() {
    if (this.tabela?.selection.selected.length === 1) {
      const codigoDoAlunoSelecionado = String(this.tabela.selection.selected[0].codigo);
      this.matriculasService.openDialog(codigoDoAlunoSelecionado);
    } else {
      console.log("Nenhum aluno selecionado para matricular.");
    }
  }
}
