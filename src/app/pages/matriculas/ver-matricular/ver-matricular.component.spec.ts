import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMatricularComponent } from './ver-matricular.component';

describe('VerMatricularComponent', () => {
  let component: VerMatricularComponent;
  let fixture: ComponentFixture<VerMatricularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerMatricularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerMatricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
