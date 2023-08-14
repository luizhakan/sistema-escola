import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-formulario-matricula",
  templateUrl: "./formulario-matricula.component.html",
})
export class FormularioMatriculaComponent implements OnInit {
  @Input() alunoSelecionado: string = "";
  cursos = [];
  dataMatricula: string = "";
  alunos: { id: number; nome: string }[] = [];
  nomes: any = [];

  constructor() {}

  ngOnInit(): void {
    this.carregarCursos();
    this.carregarAlunos();
  }

  carregarCursos() {
    const cursosLocalStorage = JSON.parse(
      localStorage.getItem("cursos") || "[]"
    );
    this.cursos = cursosLocalStorage.map((curso: any) => curso.nome);
  }

  carregarAlunos() {
    const alunosLocalStorage = JSON.parse(
      localStorage.getItem("alunos") || "[]"
    );
    this.alunos = alunosLocalStorage;
    this.nomes = this.alunos.map((aluno: any) => aluno.nome);
  }

  adicionarMatricula() {
    if (this.alunoSelecionado && this.dataMatricula) {
      const alunoEncontrado = this.alunos.find(
        (aluno: any) => aluno.nome === this.alunoSelecionado
      );

      if (alunoEncontrado) {
        const alunoId = alunoEncontrado.id;
        const cursoId = this.cursos.findIndex(
          (curso: string) => curso === this.cursos[0]
        );

        const novaMatricula = {
          idAluno: alunoId,
          idCurso: cursoId,
          dataMatricula: new Date(this.dataMatricula),
        };

        const matriculasLocalStorage = JSON.parse(
          localStorage.getItem("matriculas") || "[]"
        );

        matriculasLocalStorage.push(novaMatricula);
        localStorage.setItem(
          "matriculas",
          JSON.stringify(matriculasLocalStorage)
        );
        this.dataMatricula = "";
      }
    }
  }
}
