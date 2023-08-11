import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAdicionarAlunoComponent } from './pagina-adicionar-aluno.component';

describe('PaginaAdicionarAlunoComponent', () => {
  let component: PaginaAdicionarAlunoComponent;
  let fixture: ComponentFixture<PaginaAdicionarAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaAdicionarAlunoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaAdicionarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
