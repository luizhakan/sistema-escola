import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-pagina-cursos",
  templateUrl: "./pagina-cursos.component.html",
  styleUrls: ["./pagina-cursos.component.css"],
})
export class PaginaCursosComponent implements OnInit {
  dados: any[] = [];
  cursosSelecionados: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarCursos();
  }

  carregarCursos() {
    const cursosLocalStorage = JSON.parse(
      localStorage.getItem("cursos") || "[]"
    );
    this.dados = cursosLocalStorage;
  }

  redirecionarParaAdicionarCurso() {
    console.log("Cursos selecionados:", this.cursosSelecionados);
    if (this.cursosSelecionados.length === 1) {
      console.log("Redirecionando para edição de curso...");
      const idCurso = this.cursosSelecionados[0].codigo;
      this.router.navigate(["/adicionarCursos", idCurso]);
    } else if (this.cursosSelecionados.length > 1) {
      alert("Selecione apenas um curso para editar.");
    } else {
      alert("Selecione um curso para editar.");
    }
  }

  excluirCursosSelecionados() {
    this.dados = this.dados.filter((curso) => !curso.selecionado);
    localStorage.setItem("cursos", JSON.stringify(this.dados));
    this.cursosSelecionados = [];
  }
}
