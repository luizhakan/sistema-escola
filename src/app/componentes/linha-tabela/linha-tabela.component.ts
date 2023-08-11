import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linha-tabela',
  templateUrl: './linha-tabela.component.html',
  styleUrls: ['./linha-tabela.component.css']
})
export class LinhaTabelaComponent implements OnInit {
  @Input() dados: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
