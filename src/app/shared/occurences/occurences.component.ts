import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  OccurrenceData,
  Occurrence,
  TYPES,
} from 'src/app/core/interfaces/occurrences';
import { OccurrencesService } from 'src/app/core/services/occurrences.service';
import { EventEmitter } from 'stream';
import { MenuItem } from 'primeng/api';
import {
  allOccurrencesMenu,
  dateToIsoString,
  isoDateToCalendar,
  mineOccurences,
} from 'src/app/utils/occurrence.utils';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'occurences',
  templateUrl: './occurences.component.html',
  styleUrls: ['./occurences.component.scss'],
})
export class OccurencesComponent implements OnInit {
  @Input() isLogged: boolean = false;

  occurrenceDialog?: boolean;
  @Input() occurrences: OccurrenceData[] = [];
  @Input() selectedOccurrence?: OccurrenceData;

  loading: boolean = false;

  occurrence: Partial<Occurrence> = {};
  selectedProducts?: Occurrence[] | null;
  submitted?: boolean = false;
  @Input() userId?: number;
  term: string = '';

  occurencesPerPage: number = 10;
  showPagination: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _occurrencesService: OccurrencesService
  ) {}

  items: MenuItem[] = [
    { label: 'Ocorrências', icon: 'pi pi-fw pi-home', id: 'all' },
    { label: 'Minhas ocorrências', icon: 'pi pi-fw pi-user', id: 'mine' },
  ];
  activeItem: MenuItem = this.items[0];

  ngOnInit(): void {
    this.setMenuItems(this.isLogged);
    this.getAllOccurrences();
  }

  setMenuItems(isLogged: boolean) {
    if (isLogged) {
      this.items = [allOccurrencesMenu, mineOccurences];
      this.activeItem = this.items[0];
    } else {
      this.items = [allOccurrencesMenu];
      this.activeItem = this.items[0];
    }
  }

  typeOfOccurrence(occurenceType: number) {
    return TYPES[occurenceType];
  }

  getAllOccurrences(item?: MenuItem) {
    if (this.loading) return;
    if (item) this.activeItem = item;
    if (this.activeItem.id === 'all') {
      this.loading = true;
      this._occurrencesService.getAllOccurrences().subscribe((occurrences) => {
        occurrences.forEach((occurrence) => {
          occurrence._occurrence_type = TYPES[occurrence.occurrence_type];
        });
        this.occurrences = occurrences;
        this.setShowPagination();

        this.loading = false;
      });
    }
    if (this.activeItem.id === 'mine' && this.userId) {
      this.loading = true;
      this._occurrencesService
        .getAllOccurrencesByUser(this.userId)
        .subscribe((occurrences) => {
          occurrences.forEach((occurrence) => {
            occurrence._occurrence_type = TYPES[occurrence.occurrence_type];
          });
          this.occurrences = occurrences;
          this.setShowPagination();
          this.loading = false;
        });
    }
  }

  setShowPagination() {
    this.showPagination = this.occurrences.length > this.occurencesPerPage;
  }

  openNew() {
    this.occurrence = {};
    this.submitted = false;
    this.occurrenceDialog = true;
  }

  editOccurrence(occurence: Occurrence) {
    this.occurrence = this.formatOccurrenceToEdit(occurence);
    this.occurrenceDialog = true;
  }

  deleteOccurrence(occurrence: Occurrence) {
    const message = `Tem certeza que deseja deletar a ocorrência ${occurrence.local} do km ${occurrence.km}?`;
    this.confirmationService.confirm({
      message,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._occurrencesService.deleteOccurrence(occurrence.id).subscribe({
          next: () => {
            this.getAllOccurrences();
            this.messageService.add({
              severity: 'success',
              summary: 'Deu boa!',
              detail: 'Ocorrência deletada.',
              life: 3000,
            });
          },
          error: (error: any) => {
            let detail = '';
            detail += error.error.message ? error.error.message : '';
            this.messageService.add({
              severity: 'error',
              summary: 'Ops!',
              detail,
              life: 3000,
            });
          },
        });
      },
    });
  }

  updateOccurrence() {
    this.submitted = true;
    let occurrence: OccurrenceData = this.formatOccurrenceToSave();
    if (occurrence._occurrence_type) delete occurrence._occurrence_type;
    this._occurrencesService.updateOccurrence(occurrence).subscribe({
      next: (occurrence: OccurrenceData) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Feito!',
          detail: `A ocorrencia ${occurrence.local} foi atualizada com sucesso!`,
          life: 3000,
        });
        this.getAllOccurrences();
      },
      error: (error: any) => {
        let detail = '';
        detail += error.error.message ? error.error.message : '';
        this.messageService.add({
          severity: 'error',
          summary: 'Ops!',
          detail,
          life: 3000,
        });
      },
    });

    this.occurrenceDialog = false;
    this.resetOccurrence();
  }

  hideDialog() {
    this.occurrenceDialog = false;
    this.submitted = false;
    this.resetOccurrence();
  }

  resetOccurrence() {
    this.occurrence = {};
  }

  saveOccurrence() {
    this.submitted = true;
    const occurrence = this.formatOccurrenceToSave();
    this._occurrencesService.createOccurrence(occurrence).subscribe({
      next: (occurrence: OccurrenceData) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Feito!',
          detail: `A ocorrencia ${occurrence.local} foi criada com sucesso!`,
          life: 3000,
        });
        this.getAllOccurrences();
      },
      error: (error: any) => {
        let detail = '';
        detail += error.error.message ? error.error.message : '';
        this.messageService.add({
          severity: 'error',
          summary: 'Ops!',
          detail,
          life: 3000,
        });
      },
    });

    this.occurrenceDialog = false;
    this.resetOccurrence();
  }

  formatOccurrenceToSave() {
    const user_id = this.userId;
    const registered_at = dateToIsoString(this.occurrence.registered_at);
    const occurrence = {
      ...(this.occurrence as Occurrence),
      registered_at,
      user_id,
    };
    return occurrence as Occurrence;
  }

  formatOccurrenceToEdit(occurence: Occurrence) {
    const registered_at = isoDateToCalendar(occurence.registered_at);
    return {
      ...occurence,
      registered_at,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLogged']) {
      this.setMenuItems(this.isLogged);
      this.getAllOccurrences();
    }
  }
}
