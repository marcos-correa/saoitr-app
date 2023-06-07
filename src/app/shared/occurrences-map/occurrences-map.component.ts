import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  dialogVisible: boolean = false;
  // markerTitle: string;

  selectedPosition: any;

  infoWindow: any;

  // @ViewChild('gmap') mapElement: any;
  // map: google.maps.Map | undefined;
  // draggable: boolean;
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
    this.infoWindow = new google.maps.InfoWindow();
  }

  getOccurrences() {
    this._occurrencesService.occurences$.subscribe((data) => {
      this.occurences = data;
      this.initOccurrences();
    });
  }

  initOccurrences() {
    let iconIdx = 0;
    this.overlays = [];
    this.occurences.forEach((occurrence) => {
      let { km } = occurrence;
      const { lat, lng } = COORD[km] || COORD[50];
      const title = `KM ${km} - ${occurrence.local}`;
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
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;
    console.log(event);

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent(title);
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this._messageService.add({
        severity: 'info',
        summary: TYPES[event.overlay.getCursor()],
        detail: title,
        sticky: true,
      });
    }
  }
}
