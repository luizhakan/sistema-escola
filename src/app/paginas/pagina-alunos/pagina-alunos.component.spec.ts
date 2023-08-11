import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAlunosComponent } from './pagina-alunos.component';

describe('PaginaAlunosComponent', () => {
  let component: PaginaAlunosComponent;
  let fixture: ComponentFixture<PaginaAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaAlunosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
