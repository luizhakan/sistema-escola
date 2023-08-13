import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-pagina-adicionar-matricula",
  templateUrl: "./pagina-adicionar-matricula.component.html",
  styleUrls: ["./pagina-adicionar-matricula.component.css"],
})
export class PaginaAdicionarMatriculaComponent implements OnInit {
  alunoSelecionado: any = {};
  nomes: any[] = [];
  dadosFormatados: { nome: string; curso: string; dataMatricula: Date }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.carregarNomes();
    let dados = JSON.parse(localStorage.getItem("alunos") || "[]");

    // pegar somente os nomes da variável dados
    this.nomes = dados.map((aluno: any) => aluno.nome);

    this.route.params.subscribe((params) => {
      const idAluno = +params["id"];
      const aluno = this.nomes.find((n) => n.codigo === idAluno);

      if (aluno) {
        this.alunoSelecionado = aluno;
      } else {
        this.alunoSelecionado = null;
      }
    });
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

    this.dadosFormatados = matriculasLocalStorage.map((matricula: any) => {
      return {
        nome: matricula.nome,
        curso: matricula.curso,
        dataMatricula: new Date(matricula.dataMatricula),
      };
    });
  }

  removeMatricula(index: number) {
    this.dadosFormatados.splice(index, 1);
    const matriculasLocalStorage = JSON.parse(
      localStorage.getItem("matriculas") || "[]"
    );
    matriculasLocalStorage.splice(index, 1);
    localStorage.setItem("matriculas", JSON.stringify(matriculasLocalStorage));
  }
}
