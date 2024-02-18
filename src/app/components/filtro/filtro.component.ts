// filtro.component.ts

/**
 * Componente de filtro utilizado para filtrar dados com base em um campo de entrada.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css',
})
export class FiltroComponent {
  /**
   * Nome do filtro.
   */
  @Input() nome = '';

  /**
   * Valor do campo de entrada do filtro.
   */
  @Input() valorDoCampo = '';

  /**
   * Texto de placeholder para o campo de entrada do filtro.
   */
  @Input() placeholder = '';

  /**
   * Evento emitido quando o valor do campo de entrada do filtro é alterado.
   */
  @Output() valorDoCampoChange = new EventEmitter<string>();

  /**
   * Filtra os dados com base no valor do campo de entrada do filtro.
   * @param event O evento de alteração do campo de entrada.
   */
  filtrar(event: any) {
    this.valorDoCampo = event.target.value;
    this.valorDoCampoChange.emit(this.valorDoCampo);
  }
}
