import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho-tabela',
  templateUrl: './cabecalho-tabela.component.html',
  styleUrls: ['./cabecalho-tabela.component.css']
})
export class CabecalhoTabelaComponent implements OnInit {
  @Input() colunas: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
