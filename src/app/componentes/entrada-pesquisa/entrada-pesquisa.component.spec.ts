import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaPesquisaComponent } from './entrada-pesquisa.component';

describe('EntradaPesquisaComponent', () => {
  let component: EntradaPesquisaComponent;
  let fixture: ComponentFixture<EntradaPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaPesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
