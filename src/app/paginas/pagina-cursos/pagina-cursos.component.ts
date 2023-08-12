import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { EntradaPesquisaComponent } from "src/app/componentes/entrada-pesquisa/entrada-pesquisa.component";

@Component({
  selector: "app-pagina-cursos",
  templateUrl: "./pagina-cursos.component.html",
  styleUrls: ["./pagina-cursos.component.css"],
})
export class PaginaCursosComponent implements OnInit {
  dados: any[] = [];
  cursosSelecionados: any[] = [];

  @ViewChild(EntradaPesquisaComponent, { static: true })
  entradaPesquisaComponent!: EntradaPesquisaComponent;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarCursos();
  }

  carregarCursos() {
    const cursosLocalStorage = JSON.parse(
      localStorage.getItem("cursos") || "[]"
    );
    const termoPesquisa =
      this.entradaPesquisaComponent.termoPesquisa.toLowerCase();

    this.dados = cursosLocalStorage
      .filter((curso: any) => curso.nome.toLowerCase().includes(termoPesquisa))
      .map((curso: any) => ({
        ...curso,
        selecionado: false,
      }));
  }

  redirecionarParaAdicionarCurso() {
    if (this.cursosSelecionados.length === 1) {
      const queryParams = `nome=${encodeURIComponent(
        this.cursosSelecionados[0].nome
      )}&dataNascimento=${this.cursosSelecionados[0].dataNascimento.toISOString()}`;
      window.location.href = `/adicionarCursos?${queryParams}`;
    } else {
      this.router.navigate(["/adicionarCursos"]);
    }
  }

  excluirCursosSelecionados() {
    this.dados = this.dados.filter((curso) => !curso.selecionado);
    localStorage.setItem("cursos", JSON.stringify(this.dados));
    this.carregarCursos();
  }
}
