import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAdicionarMatriculaComponent } from './pagina-adicionar-matricula.component';

describe('PaginaAdicionarMatriculaComponent', () => {
  let component: PaginaAdicionarMatriculaComponent;
  let fixture: ComponentFixture<PaginaAdicionarMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaAdicionarMatriculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaAdicionarMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
