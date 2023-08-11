import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoTabelaComponent } from './cabecalho-tabela.component';

describe('CabecalhoTabelaComponent', () => {
  let component: CabecalhoTabelaComponent;
  let fixture: ComponentFixture<CabecalhoTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabecalhoTabelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabecalhoTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
