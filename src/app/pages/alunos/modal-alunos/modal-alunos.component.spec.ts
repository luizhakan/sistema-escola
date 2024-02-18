import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlunosComponent } from './modal-alunos.component';

describe('ModalAlunosComponent', () => {
  let component: ModalAlunosComponent;
  let fixture: ComponentFixture<ModalAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAlunosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
