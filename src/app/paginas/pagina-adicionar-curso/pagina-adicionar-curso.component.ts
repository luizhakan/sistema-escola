import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-pagina-adicionar-curso",
  templateUrl: "./pagina-adicionar-curso.component.html",
  styleUrls: ["./pagina-adicionar-curso.component.css"],
})
export class PaginaAdicionarCursoComponent implements OnInit {
  cursoSelecionado: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

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
    this.cursoSelecionado =
      cursosLocalStorage.find((curso: any) => curso.codigo == idCurso) || {};
  }

  adicionarCurso() {
    if (this.cursoSelecionado) {
      alert(
        "Desmarque a seleção e clique em 'Incluir' para adicionar um novo curso."
      );
    } else {
      // Lógica para adicionar o curso à localStorage
      // ...
      this.router.navigate(["/cursos"]);
    }
  }

  alterarCurso() {
    if (!this.cursoSelecionado) {
      alert("Selecione um curso para editar.");
    } else {
      // Lógica para alterar o curso na localStorage
      // ...
      this.router.navigate(["/cursos"]);
    }
  }
}
