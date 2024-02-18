import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMatriculasComponent } from './modal-matriculas.component';

describe('ModalMatriculasComponent', () => {
  let component: ModalMatriculasComponent;
  let fixture: ComponentFixture<ModalMatriculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalMatriculasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalMatriculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
