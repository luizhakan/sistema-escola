import { Component, OnInit, ViewChild } from "@angular/core";
import { EntradaPesquisaComponent } from "../../componentes/entrada-pesquisa/entrada-pesquisa.component";

@Component({
  selector: "app-pagina-matriculas",
  templateUrl: "./pagina-matriculas.component.html",
})
export class PaginaMatriculasComponent implements OnInit {
  dadosFormatados: { codigo: number; nome: string }[] = [];
  nomes: { codigo: number; nome: string }[] = [];
  @ViewChild(EntradaPesquisaComponent, { static: true })
  entradaPesquisaComponent!: EntradaPesquisaComponent;

  alunosSelecionados: boolean[] = [];

  constructor() {}

  ngOnInit() {
    this.carregarAlunos();
    localStorage.setItem("matriculas", JSON.stringify([]));
  }

  carregarAlunos() {
    const alunosLocalStorage = JSON.parse(
      localStorage.getItem("alunos") || "[]"
    );

    this.dadosFormatados = alunosLocalStorage.map((aluno: any) => {
      return { codigo: aluno.id, nome: aluno.nome };
    });

    this.nomes = this.dadosFormatados.map((aluno) => aluno);
    this.alunosSelecionados = this.dadosFormatados.map(() => false);
  }

  alunoSelecionadoChanged(index: number) {
    this.alunosSelecionados = this.alunosSelecionados.map(
      (_, i) => i === index
    );
  }

  getSelectedAlunoId(): number | null {
    const selectedAlunoIndex = this.alunosSelecionados.findIndex(
      (selected) => selected
    );
    if (selectedAlunoIndex !== -1) {
      return this.dadosFormatados[selectedAlunoIndex].codigo;
    }
    return null;
  }

  hasSelectedAluno(): boolean {
    return this.getSelectedAlunoId() !== null;
  }

  filtrarAlunos() {
    const termoPesquisa = this.entradaPesquisaComponent.termoPesquisa;
    if (!termoPesquisa) {
      this.carregarAlunos();
      return;
    } else {
      this.dadosFormatados = this.nomes.filter((aluno) => {
        return aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
      });
    }
  }
}
