import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botoes',
  templateUrl: './botoes.component.html',
  styleUrl: './botoes.component.css',
})
export class BotoesComponent {
  @Input() nome: string = '';
  @Input() desativar!: boolean;
}
