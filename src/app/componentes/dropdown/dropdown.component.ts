import { Component, Input } from "@angular/core";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
})
export class DropdownComponent {
  @Input() items: string[] = [];
  selectedItem: string | undefined;
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.isOpen = false;
  }
}
