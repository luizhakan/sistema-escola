import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-formulario-matricula",
  templateUrl: "./formulario-matricula.component.html"
})
export class FormularioMatriculaComponent implements OnInit {
  @Input() alunoSelecionado: string = ""; // Adicione o valor padrão aqui
  cursos = [];
  dataMatricula: string = "";
  dadosFormatados: { nome: string; curso: string; dataMatricula: Date }[] = [];
  alunos = [];
  nomes: any = [];

  constructor() {}

  ngOnInit(): void {
    this.carregarCursos();
    this.dadosFormatados = JSON.parse(localStorage.getItem("alunos") || "[]");
    this.alunos = JSON.parse(localStorage.getItem("alunos") || "[]");

    this.nomes = this.alunos.map((aluno: any) => aluno.nome);
  }

  carregarCursos() {
    const cursosLocalStorage = JSON.parse(
      localStorage.getItem("cursos") || "[]"
    );
    this.cursos = cursosLocalStorage.map((curso: any) => curso.nome);
  }

  adicionarMatricula() {
    if (this.alunoSelecionado && this.dataMatricula) {
      // Verifique o alunoSelecionado
      const novaMatricula = {
        nome: this.alunoSelecionado,
        curso: this.cursos[0], // Aqui você pode pegar o curso selecionado da dropdown
        dataMatricula: new Date(this.dataMatricula),
      };

      const matriculasLocalStorage = JSON.parse(
        localStorage.getItem("matriculas") || "[]"
      );

      matriculasLocalStorage.push(novaMatricula);
      localStorage.setItem(
        "matriculas",
        JSON.stringify(matriculasLocalStorage)
      );
      this.dataMatricula = "";
    }
  }
}
