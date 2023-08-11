import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaTabelaComponent } from './linha-tabela.component';

describe('LinhaTabelaComponent', () => {
  let component: LinhaTabelaComponent;
  let fixture: ComponentFixture<LinhaTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinhaTabelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinhaTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
