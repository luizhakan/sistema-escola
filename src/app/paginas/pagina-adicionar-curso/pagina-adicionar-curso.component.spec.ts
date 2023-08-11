import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAdicionarCursoComponent } from './pagina-adicionar-curso.component';

describe('PaginaAdicionarCursoComponent', () => {
  let component: PaginaAdicionarCursoComponent;
  let fixture: ComponentFixture<PaginaAdicionarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaAdicionarCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaAdicionarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
