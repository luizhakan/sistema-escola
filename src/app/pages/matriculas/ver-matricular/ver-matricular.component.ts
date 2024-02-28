import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursoMatricula } from '../interface';
import { MatriculasService } from '../matriculas.service';
import { CursosService } from '../../cursos/cursos.service';
import { Alunos } from '../../../components/tabela/interfaces-tabela';

@Component({
  selector: 'app-ver-matricular',
  templateUrl: './ver-matricular.component.html',
  styleUrls: ['./ver-matricular.component.css'],
})
export class VerMatricularComponent implements OnInit {
  @Input() alunoSelecionado: Alunos | undefined;

  dados: CursoMatricula[] = [];
  dataSource = new MatTableDataSource<{
    codigoMatricula: string;
    nomeDoCurso: string;
    dataMatricula: string;
  }>();

  displayedColumns: string[] = [
    'codigoMatricula',
    'nomeDoCurso',
    'dataMatricula',
  ];

  disabledVoltar: boolean = false;
  disabledExcluir: boolean = true;

  /**
   * Construtor para criar uma nova instância da classe.
   *
   * @param {MatriculasService} matriculasService - instância de MatriculasService
   * @param {CursosService} cursosService - instância de CursosService
   */
  constructor(
    private matriculasService: MatriculasService,
    private cursosService: CursosService
  ) {}

  /**
   * Inicializa o componente e realiza alguma recuperação de dados e registro com base no aluno selecionado.
   *
   * @return {void} Sem valor de retorno
   */
  ngOnInit(): void {
    if (this.matriculasService.alunoSelecionado?.codigo) {
      console.log(
        'Aluno selecionado:',
        this.matriculasService.alunoSelecionado
      );
      this.dados = this.matriculasService.obterMatriculasPorCodigoAluno(
        this.matriculasService.alunoSelecionado.codigo.toString()
      );
    } else {
      console.log('Nenhum aluno selecionado.');
    }
  }

  /**
   * Recebe dados e formata-los.
   */
  receberDadosEFormatar(): void {
    const dadosFormatados: {
      codigoMatricula: string;
      nomeDoCurso: string;
      dataMatricula: string;
    }[] = [];

    for (let i = 0; i < this.dados.length; i++) {
      const matricula = this.dados[i];
      const nomeDoCurso = this.cursosService.obterNomeDoCurso(
        matricula.codigoDoCurso[0].codigo
      );
      const dataMatricula = matricula.dataMatricula;

      dadosFormatados.push({
        codigoMatricula: matricula.codigoMatricula,
        nomeDoCurso: nomeDoCurso || 'Curso não encontrado',
        dataMatricula: dataMatricula,
      });
    }

    this.dataSource.data = dadosFormatados;
  }

  /**
   * Uma função para validar algo.
   *
   */
  validar(): void {
    if (this.dataSource.data.length > 0) {
      this.disabledExcluir = false;
    } else {
      this.disabledExcluir = true;
    }
  }

  /**
   * Uma descrição da função inteira.
   *
   * @param {any} linhasSelecionadas - descrição do parâmetro
   * @return {void}
   */
  onExcluirClick(linhasSelecionadas: any): void {
    this.matriculasService.excluirMatricula(linhasSelecionadas);
  }
}
