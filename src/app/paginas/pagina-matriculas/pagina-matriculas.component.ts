import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pagina-matriculas",
  templateUrl: "./pagina-matriculas.component.html",
  styleUrls: ["./pagina-matriculas.component.css"],
})
export class PaginaMatriculasComponent implements OnInit {
  dadosFormatados: { codigo: number; nome: string; selecionado: boolean }[] =
    [];
  nomes: { codigo: number; nome: string }[] = [];

  constructor() {}

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    const alunosLocalStorage = JSON.parse(
      localStorage.getItem("alunos") || "[]"
    );

    this.dadosFormatados = alunosLocalStorage.map((aluno: any) => {
      return { codigo: aluno.codigo, nome: aluno.nome, selecionado: false };
    });

    this.nomes = this.dadosFormatados.map((aluno) => aluno);
  }

  
}
