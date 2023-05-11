import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'saoitr-app';

  isLoading = false;

  constructor() {}

  reset() {
    this.setLoading(true);
    console.log('BASE_URL', environment['baseURL']);

    // this.reset things here
    setTimeout(() => {
      this.setLoading(false);
    }, 300);
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
}
