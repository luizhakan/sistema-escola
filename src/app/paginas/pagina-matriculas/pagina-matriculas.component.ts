import { Component, OnInit, ViewChild } from "@angular/core";
import { EntradaPesquisaComponent } from "src/app/componentes/entrada-pesquisa/entrada-pesquisa.component";

@Component({
  selector: "app-pagina-matriculas",
  templateUrl: "./pagina-matriculas.component.html",
  styleUrls: ["./pagina-matriculas.component.css"],
})
export class PaginaMatriculasComponent implements OnInit {
  dadosFormatados: { codigo: number; nome: string; selecionado: boolean }[] =
    [];
  nomes: { codigo: number; nome: string }[] = [];
  @ViewChild(EntradaPesquisaComponent, { static: true })
  entradaPesquisaComponent!: EntradaPesquisaComponent;

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

  filtrarAlunos() {
    const termoPesquisa = this.entradaPesquisaComponent.termoPesquisa;
    if (!termoPesquisa) {
      this.carregarAlunos();
      return;
    } else {
      this.dadosFormatados = this.dadosFormatados.filter((aluno) => {
        return aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
      });
    }
  }
}
