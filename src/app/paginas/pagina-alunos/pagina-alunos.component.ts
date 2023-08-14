import { Component, OnInit, ViewChild } from "@angular/core";
import { EntradaPesquisaComponent } from "../../componentes/entrada-pesquisa/entrada-pesquisa.component";

@Component({
  selector: "app-pagina-alunos",
  templateUrl: "./pagina-alunos.component.html"
})
export class PaginaAlunosComponent implements OnInit {
  dadosFormatados: {
    codigo: number;
    nome: string;
    dataNascimento: Date;
    selecionado: boolean;
  }[];

  @ViewChild(EntradaPesquisaComponent, { static: true })
  entradaPesquisaComponent!: EntradaPesquisaComponent;

  constructor() {
    this.dadosFormatados = [];
  }

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    const alunosLocalStorage = JSON.parse(
      localStorage.getItem("alunos") || "[]"
    );
    this.dadosFormatados = alunosLocalStorage.map((d: any) => {
      const dataNascimentoUTC = new Date(d.dataNascimento);
      const dataNascimentoLocal = new Date(
        dataNascimentoUTC.getTime() +
          dataNascimentoUTC.getTimezoneOffset() * 60000
      );

      return {
        codigo: d.codigo,
        nome: d.nome,
        dataNascimento: dataNascimentoLocal,
        selecionado: false,
      };
    });
  }

  filtrarAlunos() {
    const termoPesquisa = this.entradaPesquisaComponent.termoPesquisa;
    if (!termoPesquisa) {
      this.carregarAlunos();
      return;
    } else {
      this.dadosFormatados = this.dadosFormatados.filter((aluno) => {
        return aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
      });
    }
  }

  excluirAlunos() {
    const alunosExcluir = this.dadosFormatados.filter(
      (aluno) => aluno.selecionado
    );

    if (alunosExcluir.length === 0) {
      alert("Selecione pelo menos um aluno para excluir.");
      return;
    }

    this.dadosFormatados = this.dadosFormatados.filter(
      (aluno) => !aluno.selecionado
    );

    localStorage.setItem("alunos", JSON.stringify(this.dadosFormatados));
  }

  alterarAlunos() {
    const alunosSelecionados = this.dadosFormatados.filter(
      (aluno) => aluno.selecionado
    );

    if (alunosSelecionados.length === 0) {
      alert("Selecione pelo menos um aluno para alterar.");
      return;
    }

    if (alunosSelecionados.length > 1) {
      alert("Selecione apenas um aluno para alterar.");
      return;
    }

    const alunoSelecionado = alunosSelecionados[0];

    const queryParams = `nome=${encodeURIComponent(
      alunoSelecionado.nome
    )}&dataNascimento=${alunoSelecionado.dataNascimento.toISOString()}`;
    window.location.href = `/adicionarAlunos?${queryParams}`;
  }

  excluirAluno(index: number) {
    this.dadosFormatados.splice(index, 1);

    localStorage.setItem("alunos", JSON.stringify(this.dadosFormatados));
  }
}
