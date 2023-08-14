import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-pagina-adicionar-curso",
  templateUrl: "./pagina-adicionar-curso.component.html",
})
export class PaginaAdicionarCursoComponent implements OnInit {
  cursoSelecionado: any = {};

  cursos: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idCurso = params["id"];
      this.carregarCurso(idCurso);
    });
  }

  getNomeCurso(idCurso: number): string {
    const cursoEncontrado = this.cursos.find(
      (curso: any, index: number) => index + 1 === idCurso
    );
    return cursoEncontrado || "";
  }

  carregarCurso(idCurso: any) {
    const cursosLocalStorage = JSON.parse(
      localStorage.getItem("cursos") || "[]"
    );
    this.cursos = cursosLocalStorage;
    this.cursoSelecionado =
      cursosLocalStorage.find((curso: any) => curso.codigo == idCurso) || {};
  }

  adicionarCurso() {
    if (this.cursoSelecionado) {
      alert(
        "Desmarque a seleção e clique em 'Incluir' para adicionar um novo curso."
      );
    } else {
      this.router.navigate(["/cursos"]);
    }
  }

  alterarCurso() {
    if (!this.cursoSelecionado) {
      alert("Selecione um curso para editar.");
    } else {
      this.router.navigate(["/cursos"]);
    }
  }
}
