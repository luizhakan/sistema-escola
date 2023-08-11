import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMatriculasComponent } from './pagina-matriculas.component';

describe('PaginaMatriculasComponent', () => {
  let component: PaginaMatriculasComponent;
  let fixture: ComponentFixture<PaginaMatriculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaMatriculasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaMatriculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
