import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-botao",
  templateUrl: "./botao.component.html",
})
export class BotaoComponent implements OnInit {
  @Input() texto: string = "Texto padrão";

  constructor() {}

  ngOnInit(): void {}
}
