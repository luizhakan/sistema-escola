import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursoMatricula } from '../interface';
import { MatriculasService } from '../matriculas.service';
import { CursosService } from '../../cursos/cursos.service';

@Component({
  selector: 'app-ver-matricular',
  templateUrl: './ver-matricular.component.html',
  styleUrls: ['./ver-matricular.component.css'],
})
export class VerMatricularComponent implements OnInit {
  dados: CursoMatricula[] = [];
  dataSource = new MatTableDataSource<{
    codigoMatricula: string;
    nomeDoCurso: string;
    dataMatricula: string;
  }>();
  // Certifique-se de que as propriedades correspondam às colunas na tabela
  displayedColumns: string[] = [
    'codigoMatricula',
    'nomeDoCurso',
    'dataMatricula',
  ];

  disabledVoltar: boolean = false;
  disabledExcluir: boolean = true;

  constructor(
    private matriculasService: MatriculasService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    if (this.matriculasService.alunoSelecionado) {
      console.log(
        'Aluno selecionado:',
        this.matriculasService.alunoSelecionado
      );
      this.dados = this.matriculasService.obterMatriculasPorAluno();
      console.log('Dados no ngOnInit:', this.dados);

      this.receberDadosEFormatar();
      this.validar(); // Adiciona esta linha
    } else {
      console.log('Nenhum aluno selecionado');
    }
  }

  receberDadosEFormatar(): void {
    const dadosFormatados: {
      codigoMatricula: string;
      nomeDoCurso: string;
      dataMatricula: string;
    }[] = [];

    console.log('Dados para formatar:', this.dados);

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

    console.log('Dados formatados:', dadosFormatados);

    this.dataSource.data = dadosFormatados;
    console.log('this.dataSource.data:', this.dataSource.data);
  }

  validar(): void {
    if (this.dataSource.data.length > 0) {
      this.disabledExcluir = false;
    } else {
      this.disabledExcluir = true;
    }
  }

  onExcluirClick(linhasSelecionadas: any): void {
    console.log('linhasSelecionadas');
    console.log(linhasSelecionadas);

    this.matriculasService.excluirMatricula(linhasSelecionadas);
  }
}
