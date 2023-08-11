import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { EntradaPesquisaComponent } from './componentes/entrada-pesquisa/entrada-pesquisa.component';
import { CabecalhoTabelaComponent } from './componentes/cabecalho-tabela/cabecalho-tabela.component';
import { LinhaTabelaComponent } from './componentes/linha-tabela/linha-tabela.component';
import { DropdownComponent } from './componentes/dropdown/dropdown.component';
import { FormularioCursoComponent } from './componentes/formulario-curso/formulario-curso.component';
import { FormularioAlunoComponent } from './componentes/formulario-aluno/formulario-aluno.component';
import { FormularioMatriculaComponent } from './componentes/formulario-matricula/formulario-matricula.component';
import { PaginaCursosComponent } from './paginas/pagina-cursos/pagina-cursos.component';
import { PaginaAdicionarCursoComponent } from './paginas/pagina-adicionar-curso/pagina-adicionar-curso.component';
import { PaginaAlunosComponent } from './paginas/pagina-alunos/pagina-alunos.component';
import { PaginaAdicionarAlunoComponent } from './paginas/pagina-adicionar-aluno/pagina-adicionar-aluno.component';
import { PaginaMatriculasComponent } from './paginas/pagina-matriculas/pagina-matriculas.component';
import { PaginaAdicionarMatriculaComponent } from './paginas/pagina-adicionar-matricula/pagina-adicionar-matricula.component';
import { ValidacaoDirective } from './diretivas/validacao.directive';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    EntradaPesquisaComponent,
    CabecalhoTabelaComponent,
    LinhaTabelaComponent,
    DropdownComponent,
    FormularioCursoComponent,
    FormularioAlunoComponent,
    FormularioMatriculaComponent,
    PaginaCursosComponent,
    PaginaAdicionarCursoComponent,
    PaginaAlunosComponent,
    PaginaAdicionarAlunoComponent,
    PaginaMatriculasComponent,
    PaginaAdicionarMatriculaComponent,
    ValidacaoDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
