import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pagina-alunos",
  templateUrl: "./pagina-alunos.component.html",
  styleUrls: ["./pagina-alunos.component.css"],
})
export class PaginaAlunosComponent implements OnInit {
  dadosFormatados: {
    codigo: number;
    nome: string;
    dataNascimento: Date;
    selecionado: boolean;
  }[];

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
        selecionado: false, // Adicione a propriedade selecionado
      };
    });
  }

  excluirAlunos() {
    const alunosExcluir = this.dadosFormatados.filter(
      (aluno) => aluno.selecionado
    );

    if (alunosExcluir.length === 0) {
      alert("Selecione pelo menos um aluno para excluir.");
      return;
    }

    // Remove os alunos selecionados
    this.dadosFormatados = this.dadosFormatados.filter(
      (aluno) => !aluno.selecionado
    );

    // Atualiza o localStorage
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

    // Redireciona para a página de adicionar alunos com os dados preenchidos
    const queryParams = `nome=${encodeURIComponent(
      alunoSelecionado.nome
    )}&dataNascimento=${alunoSelecionado.dataNascimento.toISOString()}`;
    window.location.href = `/adicionarAlunos?${queryParams}`;
  }

  excluirAluno(index: number) {
    // Remova o aluno do array
    this.dadosFormatados.splice(index, 1);

    // Atualize o localStorage
    localStorage.setItem("alunos", JSON.stringify(this.dadosFormatados));
  }
}
