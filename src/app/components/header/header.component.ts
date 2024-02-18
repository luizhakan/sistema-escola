import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isSmallScreen = false;

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.isSmallScreen = true;
      console.log('small screen');
    } else {
      this.isSmallScreen = false;
      console.log('big screen');
    }
  }
}
