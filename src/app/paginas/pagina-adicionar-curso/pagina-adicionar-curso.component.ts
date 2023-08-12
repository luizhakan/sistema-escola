import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pagina-adicionar-curso",
  templateUrl: "./pagina-adicionar-curso.component.html",
  styleUrls: ["./pagina-adicionar-curso.component.css"],
})
export class PaginaAdicionarCursoComponent implements OnInit {
  cursoSelecionado: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idCurso = params["id"];
      this.carregarCurso(idCurso);
    });
  }

  carregarCurso(idCurso: any) {
    const cursosLocalStorage = JSON.parse(
      localStorage.getItem("cursos") || "[]"
    );
    this.cursoSelecionado = cursosLocalStorage.find(
      (curso: any) => curso.codigo == idCurso
    );
  }

  adicionarCurso(
    nome: string,
    instrutor: string,
    local: string,
    cargaHoraria: number,
    dataInicio: string
  ) {
    // Resto do código para adicionar um curso, similar ao que você já implementou
  }
}
