import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculasComponent } from './matriculas.component';

describe('MatriculasComponent', () => {
  let component: MatriculasComponent;
  let fixture: ComponentFixture<MatriculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatriculasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatriculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
