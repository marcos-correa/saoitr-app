import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { BASE_URL } from './constants';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OccurrenceCreate, OccurrenceData } from '../interfaces/occurrences';

@Injectable({
  providedIn: 'root',
})
export class OccurrencesService {
  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  occurencesSub = new BehaviorSubject<OccurrenceData[]>([]);
  occurences$ = this.occurencesSub.asObservable();

  getAllOccurrences(): Observable<OccurrenceData[]> {
    return this._httpClient
      .get<OccurrenceData[]>(`${BASE_URL()}/occurrences`)
      .pipe(
        tap((occurences: OccurrenceData[]) => {
          this.occurencesSub.next(occurences);
        })
      );
  }

  getAllOccurrencesByUser(userId: number): Observable<OccurrenceData[]> {
    return this._httpClient
      .get<OccurrenceData[]>(`${BASE_URL()}/occurrences/users/${userId}`)
      .pipe(
        tap((occurences: OccurrenceData[]) => {
          this.occurencesSub.next(occurences);
        })
      );
  }

  createOccurrence(
    occurrence: Partial<OccurrenceCreate>
  ): Observable<OccurrenceData> {
    return this._httpClient.post<OccurrenceData>(
      `${BASE_URL()}/occurrences`,
      occurrence
    );
  }

  updateOccurrence(
    occurrence: Partial<OccurrenceData>
  ): Observable<OccurrenceData> {
    return this._httpClient.put<OccurrenceData>(
      `${BASE_URL()}/occurrences/${occurrence.id}`,
      occurrence
    );
  }

  deleteOccurrence(id: number): Observable<OccurrenceData> {
    return this._httpClient.delete<OccurrenceData>(
      `${BASE_URL()}/occurrences/${id}`
    );
  }
}
