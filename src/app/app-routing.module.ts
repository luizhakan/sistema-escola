import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaginaAlunosComponent } from "./paginas/pagina-alunos/pagina-alunos.component";
import { PaginaMatriculasComponent } from "./paginas/pagina-matriculas/pagina-matriculas.component";
import { PaginaAdicionarAlunoComponent } from "./paginas/pagina-adicionar-aluno/pagina-adicionar-aluno.component";
import { PaginaAdicionarCursoComponent } from "./paginas/pagina-adicionar-curso/pagina-adicionar-curso.component";
import { PaginaAdicionarMatriculaComponent } from "./paginas/pagina-adicionar-matricula/pagina-adicionar-matricula.component";
import { PaginaCursosComponent } from "./paginas/pagina-cursos/pagina-cursos.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "cursos",
    pathMatch: "full",
  },
  {
    path: "cursos",
    component: PaginaCursosComponent,
  },
  {
    path: "alunos",
    component: PaginaAlunosComponent,
  },
  {
    path: "matriculas",
    component: PaginaMatriculasComponent,
  },
  {
    path: "adicionarAlunos",
    component: PaginaAdicionarAlunoComponent,
  },
  {
    path: "adicionarCursos",
    component: PaginaAdicionarCursoComponent,
  },
  {
    path: "adicionarMatriculas",
    component: PaginaAdicionarMatriculaComponent,
  },
  { path: "adicionarCursos/:id", component: PaginaAdicionarCursoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
