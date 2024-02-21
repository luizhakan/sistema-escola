import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: ''
})
class HeaderComponent {
  isSmallScreen!: boolean;

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

describe('HeaderComponent', () => {
  let consoleLogSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });

    // Cria um spy para console.log
    consoleLogSpy = spyOn(console, 'log');
  });

  it('should set isSmallScreen to true and log "small screen" if window width is less than 768', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    fixture.detectChanges();
    expect(component.isSmallScreen).toBe(true);
    // Verifica se console.log foi chamado com 'small screen'
    expect(consoleLogSpy).toHaveBeenCalledWith('small screen');
  });

  it('should set isSmallScreen to false and log "big screen" if window width is greater than or equal to 768', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    fixture.detectChanges();
    expect(component.isSmallScreen).toBe(false);
    // Verifica se console.log foi chamado com 'big screen'
    expect(consoleLogSpy).toHaveBeenCalledWith('big screen');
  });
});
