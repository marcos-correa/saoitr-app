import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'set-api',
  templateUrl: './set-api.component.html',
  styleUrls: ['./set-api.component.scss'],
})
export class SetApiComponent implements OnInit {
  baseURL: string = '';
  baseUTFPR: string = '';
  @Output() settedAPI = new EventEmitter<any>();

  setLocalAPI: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.baseURL = environment['baseURL'];
  }

  setAPI() {
    environment['baseURL'] = this.baseURL;
    this.settedAPI.emit();
  }

  showLocalAPI() {
    this.setLocalAPI = true;
  }

  showUTFPRAPI() {
    this.setLocalAPI = false;
  }

  setUTFPRAPI() {
    environment['baseURL'] = 'http://10.20.8.' + this.baseUTFPR;
    this.settedAPI.emit();
  }
}
