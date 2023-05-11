import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showSetApi: boolean = false;

  @Output() reset = new EventEmitter<any>();

  constructor() {}

  title: string =
    'Sistema de aviso de ocorrências de interrupção de tráfego em rodovias';
  ngOnInit(): void {}

  toggleSetApi() {
    this.showSetApi = !this.showSetApi;
  }

  settedApi() {
    this.showSetApi = false;
    this.resetApp();
  }

  resetApp() {
    this.reset.emit();
  }
}
