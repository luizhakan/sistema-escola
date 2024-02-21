import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { CursosComponent } from './cursos.component';
import { Cursos } from '../../components/tabela/interfaces-tabela';
import { CursosService } from './cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { FiltroComponent } from '../../components/filtro/filtro.component';

describe('CursosComponent', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;
  let cursosServiceSpy: jasmine.SpyObj<CursosService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CursosService', [
      'excluirCurso',
      'openDialog',
    ]);

    TestBed.configureTestingModule({
      declarations: [CursosComponent, FiltroComponent], // Adicione o FiltroComponent aqui
      imports: [MatTableModule],
      providers: [
        { provide: CursosService, useValue: spy },
        { provide: MatDialog, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
    cursosServiceSpy = TestBed.inject(
      CursosService
    ) as jasmine.SpyObj<CursosService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onFiltroChange should filter data and update dataSource', () => {
    const mockCursos: Cursos[] = [
      {
        codigo: 1,
        nome: 'Curso A',
        instrutor: 'Instrutor A',
        local: 'Local A',
        cargaHoraria: 10,
        dataInicio: '2022-01-01',
      },
      {
        codigo: 2,
        nome: 'Curso B',
        instrutor: 'Instrutor B',
        local: 'Local B',
        cargaHoraria: 20,
        dataInicio: '2022-01-02',
      },
    ];

    component.cursosService.cursos = mockCursos;
    component.dataSource = jasmine.createSpyObj('MatTableDataSource', [
      'data',
    ]);

    component.onFiltroChange('A');

    expect(component.dataSource.data).toEqual([
      {
        codigo: 1,
        nome: 'Curso A',
        instrutor: 'Instrutor A',
        local: 'Local A',
        cargaHoraria: 10,
        dataInicio: '2022-01-01',
      },
    ]);
  });

  it('onFiltroChange should not filter data if valorDoFiltro is empty', () => {
    component.onFiltroChange('');
    expect(component.dataSource.data).toEqual(component.cursosService.cursos);
  })

  it('validar should update disabledIncluir and disabledAlterar', () => {
    component.validar();
    expect(component.disabledIncluir).toBeFalse();
    expect(component.disabledAlterar).toBeTrue();
    expect(component.disabledExcluir).toBeTrue();
  })
});
