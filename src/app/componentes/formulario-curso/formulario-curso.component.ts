import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-formulario-curso",
  templateUrl: "./formulario-curso.component.html",
})
export class FormularioCursoComponent implements OnInit {
  @Input() curso: any;

  nome: string = "";
  instrutor: string = "";
  local: string = "";
  cargaHoraria: number = 0;
  dataInicio: string = "";

  constructor() {}

  ngOnInit(): void {
    if (this.curso) {
      this.nome = this.curso.nome;
      this.instrutor = this.curso.instrutor;
      this.local = this.curso.local;
      this.cargaHoraria = this.curso.cargaHoraria;
      this.dataInicio = this.curso.dataInicio;
    }
  }

  adicionarCurso(cursoFormValue: any) {
    if (
      cursoFormValue.nome &&
      cursoFormValue.instrutor &&
      cursoFormValue.local &&
      cursoFormValue.cargaHoraria &&
      cursoFormValue.dataInicio
    ) {
      const novoCodigo = new Date().getTime();
      const novoCurso = {
        codigo: novoCodigo,
        nome: cursoFormValue.nome,
        instrutor: cursoFormValue.instrutor,
        local: cursoFormValue.local,
        cargaHoraria: cursoFormValue.cargaHoraria,
        dataInicio: cursoFormValue.dataInicio,
      };

      const cursosLocalStorage = JSON.parse(
        localStorage.getItem("cursos") || "[]"
      );
      cursosLocalStorage.push(novoCurso);
      localStorage.setItem("cursos", JSON.stringify(cursosLocalStorage));
      this.limparCampos();
    }
  }

  private limparCampos() {
    this.nome = "";
    this.instrutor = "";
    this.local = "";
    this.cargaHoraria = 0;
    this.dataInicio = "";
  }
}
