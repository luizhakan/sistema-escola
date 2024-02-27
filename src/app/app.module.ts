import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { MatriculasComponent } from './pages/matriculas/matriculas.component';
import { HeaderComponent } from './components/header/header.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { ModalCursosComponent } from './pages/cursos/modal-cursos/modal-cursos.component';
import { ModalAlunosComponent } from './pages/alunos/modal-alunos/modal-alunos.component';
import { VerMatricularComponent } from './pages/matriculas/ver-matricular/ver-matricular.component';
import { ModalMatriculasComponent } from './pages/matriculas/modal-matriculas/modal-matriculas.component';
import { BotoesComponent } from './components/botoes/botoes.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    AlunosComponent,
    MatriculasComponent,
    HeaderComponent,
    FiltroComponent,
    ModalCursosComponent,
    ModalAlunosComponent,
    VerMatricularComponent,
    ModalMatriculasComponent,
    BotoesComponent,
    TabelaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
