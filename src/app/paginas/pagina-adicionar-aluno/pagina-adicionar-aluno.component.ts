import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pagina-adicionar-aluno",
  templateUrl: "./pagina-adicionar-aluno.component.html",
})
export class PaginaAdicionarAlunoComponent implements OnInit {
  novoAluno: {
    nome: string;
    dataNascimento: string;
    selecionado: boolean;
  } = {
    nome: "",
    dataNascimento: "",
    selecionado: false,
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["nome"] && params["dataNascimento"]) {
        this.novoAluno.nome = params["nome"];
        const dataNascimentoISO = new Date(
          params["dataNascimento"]
        ).toISOString();
        const dataNascimentoFormatada = dataNascimentoISO.substring(0, 10);
        this.novoAluno.dataNascimento = dataNascimentoFormatada;
      }
    });
  }

  adicionarAluno() {
    if (this.novoAluno.nome && this.novoAluno.dataNascimento) {
      const novoCodigo = new Date().getTime();
      const aluno = {
        codigo: novoCodigo,
        nome: this.novoAluno.nome,
        dataNascimento: new Date(this.novoAluno.dataNascimento).toISOString(),
      };

      const alunosLocalStorage = JSON.parse(
        localStorage.getItem("alunos") || "[]"
      );
      alunosLocalStorage.push(aluno);
      localStorage.setItem("alunos", JSON.stringify(alunosLocalStorage));

      this.novoAluno = {
        nome: "",
        dataNascimento: "",
        selecionado: false,
      };
    }
  }
}
