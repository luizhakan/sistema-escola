import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCursosComponent } from './modal-cursos.component';

describe('ModalCursosComponent', () => {
  let component: ModalCursosComponent;
  let fixture: ComponentFixture<ModalCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
