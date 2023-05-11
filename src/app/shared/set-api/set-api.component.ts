import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'set-api',
  templateUrl: './set-api.component.html',
  styleUrls: ['./set-api.component.scss'],
})
export class SetApiComponent implements OnInit {
  baseURL: string = '';
  @Output() settedAPI = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.baseURL = environment['baseURL'];
  }

  setAPI() {
    environment['baseURL'] = this.baseURL;
    console.log('BASE_URL', environment['baseURL']);
    this.settedAPI.emit();
  }
}
