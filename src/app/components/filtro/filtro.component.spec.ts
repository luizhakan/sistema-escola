import { FiltroComponent } from './filtro.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule

describe('FiltroComponent', () => {
  let component: FiltroComponent;
  let fixture: ComponentFixture<FiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroComponent],
      imports: [FormsModule], // Adicione o FormsModule aqui
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the value of valorDoCampo correctly when filtrar is called', () => {
    const sampleEvent = { target: { value: 'sample value' } };
    component.filtrar(sampleEvent);
    expect(component.valorDoCampo).toEqual('sample value');
  });

  it('should emit valorDoCampoChange event with the new value of valorDoCampo when filtrar is called', () => {
    const sampleEvent = { target: { value: 'new value' } };
    spyOn(component.valorDoCampoChange, 'emit');
    component.filtrar(sampleEvent);
    expect(component.valorDoCampoChange.emit).toHaveBeenCalledWith('new value');
  });
});
