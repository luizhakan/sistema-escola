import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './pages/cursos/cursos.component';
import { MatriculasComponent } from './pages/matriculas/matriculas.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { VerMatricularComponent } from './pages/matriculas/ver-matricular/ver-matricular.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent,
  },
  {
    path: 'cursos',
    component: CursosComponent,
  },
  {
    path: 'alunos',
    component: AlunosComponent,
  },
  {
    path: 'matriculas',
    component: MatriculasComponent,
  },
  {
    path: 'verMatricula',
    component: VerMatricularComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
