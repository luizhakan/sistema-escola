import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-tabela",
  templateUrl: "./tabela.component.html",
  styleUrls: ["./tabela.component.css"],
})
export class TabelaComponent implements OnInit {
  @Input() colunas: string[];
  @Input() dados: any[];

  constructor() {
    this.colunas = [];
    this.dados = [];
  }

  ngOnInit(): void {
    
  }
}
