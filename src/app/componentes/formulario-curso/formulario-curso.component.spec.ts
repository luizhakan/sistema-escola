import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCursoComponent } from './formulario-curso.component';

describe('FormularioCursoComponent', () => {
  let component: FormularioCursoComponent;
  let fixture: ComponentFixture<FormularioCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
