import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'saoitr-app';
  url = '';

  isLoading = false;

  constructor() {}

  ngOnInit() {
    this.setURL();
  }

  reset() {
    this.setLoading(true);
    console.log('BASE_URL', environment['baseURL']);

    // this.reset things here
    setTimeout(() => {
      this.setLoading(false);
      this.setURL();
    }, 300);
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setURL() {
    const regex = /^https?:\/\//i;
    this.url = environment['baseURL'];
    this.url = this.url.replace(regex, '');
  }
}
