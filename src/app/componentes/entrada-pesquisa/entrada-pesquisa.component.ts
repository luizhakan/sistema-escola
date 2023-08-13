import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-entrada-pesquisa",
  templateUrl: "./entrada-pesquisa.component.html",
})
export class EntradaPesquisaComponent implements OnInit {
  termoPesquisa: string = "";

  @Output() filtroAplicado = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  aplicarFiltro(event: any): void {
    const valor = event.target.value;
    this.termoPesquisa = valor;
    this.filtroAplicado.emit(this.termoPesquisa);
  }
}
