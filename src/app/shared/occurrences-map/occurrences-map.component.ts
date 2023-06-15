import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import {} from 'googlemaps';
import { MessageService } from 'primeng/api';
import { COORD } from 'src/app/core/interfaces/coordinates';
import {
  MAP_ICONS,
  OccurrenceData,
  TYPES,
} from 'src/app/core/interfaces/occurrences';
import { OccurrencesService } from 'src/app/core/services/occurrences.service';

@Component({
  selector: 'occurrences-map',
  templateUrl: './occurrences-map.component.html',
  styleUrls: ['./occurrences-map.component.scss'],
})
export class OccurrencesMapComponent implements OnInit {
  options: any;

  occurences: OccurrenceData[] = [];
  overlays: any[] = [];
  @Output() selectedOccurrence = new EventEmitter<OccurrenceData>();

  dialogVisible: boolean = false;

  selectedPosition: any;

  infoWindow: any;

  @ViewChild('gmap') mapElement: any;
  map: google.maps.Map | undefined;

  showMap: boolean = false;

  constructor(
    private _messageService: MessageService,
    private _occurrencesService: OccurrencesService
  ) {}

  ngOnInit(): void {
    this.options = {
      center: COORD[50],
      zoom: 9,
    };

    this.getOccurrences();
    this.setMap();
  }

  setMap() {
    this.showMap = !!google.maps && window.navigator.onLine;
    if (this.showMap) this.infoWindow = new google.maps.InfoWindow();
  }

  getOccurrences() {
    this._occurrencesService.occurences$.subscribe((data) => {
      this.occurences = data;
      this.initOccurrences();
    });
  }

  initOccurrences() {
    this.setMap();
    if (!this.showMap) return;

    let iconIdx = 0;
    this.overlays = [];
    this.occurences.forEach((occurrence) => {
      let { km, local } = occurrence;
      const { lat, lng } = COORD[km] || COORD[50];
      const title = this.getTitle(km, local);
      const icon = MAP_ICONS[occurrence.occurrence_type];
      const cursor = String(occurrence.occurrence_type);

      const marker = new google.maps.Marker({
        position: { lat, lng },
        title,
        icon,
        cursor,
      });

      this.overlays.push(marker);
    });
  }

  handleMapClick(event: any) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
    this.selectedOccurrence.emit({} as OccurrenceData);
  }

  getTitle(km: number, local: string = '') {
    return `KM ${km} - ${local}`;
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;
    if (isMarker) {
      const markTitle = event.overlay.getTitle();
      this.openMapModal(event, markTitle);
      this.emitSelectedOccurrence(markTitle);
      this._messageService.add({
        severity: 'info',
        summary: TYPES[event.overlay.getCursor()],
        detail: markTitle,
        life: 2000,
      });
    }
  }

  openMapModal(event: any, markTitle: string) {
    this.infoWindow.setContent(markTitle);
    this.infoWindow.open(event.map, event.overlay);
    event.map.setCenter(event.overlay.getPosition());
  }

  emitSelectedOccurrence(markTitle: string) {
    let selectedOcc = this.occurences.filter((occ) => {
      const occurrenceTitle = this.getTitle(occ.km, occ.local);
      return occurrenceTitle === markTitle;
    })[0];
    if (selectedOcc) {
      this.selectedOccurrence.emit(selectedOcc);
    }
  }
}
