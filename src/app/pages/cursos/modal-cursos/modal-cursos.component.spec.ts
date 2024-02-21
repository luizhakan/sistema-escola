import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table'; // Importe o MatTableModule
import { TabelaComponent } from '../../../components/tabela/tabela.component';

describe('TabelaComponent', () => {
  let component: TabelaComponent;
  let fixture: ComponentFixture<TabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaComponent],
      imports: [MatTableModule], // Adicione o MatTableModule aqui
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
