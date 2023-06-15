import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() url: string = '';

  showSetApi: boolean = false;
  isLogged = false;

  @Output() reset = new EventEmitter<any>();

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _toastrService: ToastrService
  ) {}

  title: string =
    'Sistema de aviso de ocorrências de interrupção de tráfego em rodovias';
  ngOnInit(): void {
    this._userService.isUserLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
    this._toastrService.message$.subscribe((message) => {
      this._messageService.add(message);
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
