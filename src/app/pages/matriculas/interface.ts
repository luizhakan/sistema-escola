// crie uma interface chamada CursoMatricula com um codigo do aluno, um array de codigoDoCurso e uma data de matricula.

export interface CursoMatricula {
  codigoMatricula: string;
  codigoDoAluno: string;
  codigoDoCurso: [{
    codigo: string;
  }];
  dataMatricula: string;
}
