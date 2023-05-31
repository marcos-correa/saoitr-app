import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { BASE_URL } from './constants';
import { Observable } from 'rxjs';
import { OccurrenceData } from '../interfaces/occurrences';

@Injectable({
  providedIn: 'root',
})
export class OccurrencesService {
  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  getAllOccurrences(): Observable<OccurrenceData[]> {
    return this._httpClient.get<OccurrenceData[]>(`${BASE_URL()}/occurrences`);
  }
}
