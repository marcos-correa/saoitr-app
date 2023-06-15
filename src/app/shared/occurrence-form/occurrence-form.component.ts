import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Occurrence,
  OccurrenceData,
  TYPES_BY_OCCURENCE,
} from 'src/app/core/interfaces/occurrences';

@Component({
  selector: 'occurrence-form',
  templateUrl: './occurrence-form.component.html',
  styleUrls: ['./occurrence-form.component.scss'],
})
export class OccurrenceFormComponent implements OnInit {
  @Input() occurrence: Partial<OccurrenceData> = {};
  @Output() occurrenceChange = new EventEmitter<Partial<Occurrence>>();

  occurenceDate?: string;

  nowDate = new Date();

  submitted?: boolean = false;
  types: any[] = TYPES_BY_OCCURENCE;

  @Output() hide = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() update = new EventEmitter();

  @Input() userId?: number;

  constructor() {}

  onOccurrenceChange() {
    delete this.occurrence._occurrence_type;
    this.occurrenceChange.emit(this.occurrence);
  }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  hideDialog() {
    console.log('hideDialog');
    this.hide.emit();
  }

  saveOccurrence() {
    if (this.occurrence.id) {
      this.occurrenceChange.emit(this.occurrence);
      this.update.emit();
    } else {
      this.occurrence.user_id = this.userId;
      this.occurrenceChange.emit(this.occurrence);
      this.save.emit();
    }
  }

  resetForm() {
    this.occurrence = {};
    this.occurenceDate = '';
  }
}
