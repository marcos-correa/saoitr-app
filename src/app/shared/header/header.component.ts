import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showSetApi: boolean = false;
  isLogged = false;

  @Output() reset = new EventEmitter<any>();

  constructor(private _userService: UserService) {}

  title: string =
    'Sistema de aviso de ocorrências de interrupção de tráfego em rodovias';
  ngOnInit(): void {
    this._userService.isUserLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

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

  logout() {
    this._userService.logout();
  }
}
