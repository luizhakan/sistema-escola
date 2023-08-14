import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-pagina-adicionar-matricula",
  templateUrl: "./pagina-adicionar-matricula.component.html",
})
export class PaginaAdicionarMatriculaComponent implements OnInit {
  alunoSelecionado: any = {};
  nomes: any[] = [];
  dadosFormatados: { curso: string; dataMatricula: Date }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.carregarNomes();
    this.route.params.subscribe((params) => {
      const idAluno = +params["id"];
      const aluno = this.nomes.find((n) => n.codigo === idAluno);

      if (aluno) {
        this.alunoSelecionado = aluno;
      }
    });
    this.carregarMatriculas();
  }

  carregarNomes() {
    const alunosLocalStorage = JSON.parse(
      localStorage.getItem("alunos") || "[]"
    );
    this.nomes = alunosLocalStorage;
  }

  carregarMatriculas() {
    const matriculasLocalStorage = JSON.parse(
      localStorage.getItem("matriculas") || "[]"
    );

    this.dadosFormatados = matriculasLocalStorage
      .filter(
        (matricula: any) => matricula.idAluno === this.alunoSelecionado.codigo
      )
      .map((matricula: any) => {
        return {
          curso: this.getCursoNomeById(matricula.idCurso),
          dataMatricula: new Date(matricula.dataMatricula),
        };
      });
  }

  getCursoNomeById(idCurso: number): string {
    const cursosLocalStorage = JSON.parse(
      localStorage.getItem("cursos") || "[]"
    );
    const curso = cursosLocalStorage.find((curso: any) => curso.id === idCurso);
    return curso ? curso.nome : "Curso não encontrado";
  }

  removeMatricula(index: number) {
    const matriculasLocalStorage = JSON.parse(
      localStorage.getItem("matriculas") || "[]"
    );

    matriculasLocalStorage.splice(index, 1);
    localStorage.setItem("matriculas", JSON.stringify(matriculasLocalStorage));
    this.carregarMatriculas();
  }

  voltarParaMatriculas() {
    this.router.navigate(["/matriculas"]);
  }
}
