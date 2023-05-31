import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../occurences/occurences.component';
import { Occurrence } from 'src/app/core/interfaces/occurrences';

@Component({
  selector: 'create-occurrence',
  templateUrl: './create-occurrence.component.html',
  styleUrls: ['./create-occurrence.component.scss'],
})
export class CreateOccurrenceComponent implements OnInit {
  @Input() occurrence: Partial<Occurrence> = {};
  @Output() occurrenceChange = new EventEmitter<Partial<Occurrence>>();

  submitted?: boolean = false;
  types: any[] = [
    { occurrence_type: 1, description: 'Atropelamento' },
    { occurrence_type: 2, description: 'Deslizamento' },
    { occurrence_type: 3, description: 'Colisão frontal' },
    { occurrence_type: 4, description: 'Capotagem' },
    { occurrence_type: 5, description: 'Saída de pista' },
    { occurrence_type: 6, description: 'Batida em objeto fixo' },
    { occurrence_type: 7, description: 'Veículo avariado' },
    { occurrence_type: 8, description: 'Colisão com motocicletas' },
    {
      occurrence_type: 9,
      description: 'Colisão no mesmo sentido ou transversal',
    },
    { occurrence_type: 10, description: 'Construção' },
  ];

  @Output() hide = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor() {}

  onOccurrenceChange() {
    console.log(this.occurrence);
    this.occurrenceChange.emit(this.occurrence);
  }

  ngOnInit(): void {}

  hideDialog() {
    console.log('hideDialog');
    this.hide.emit();
  }

  saveProduct() {
    this.save.emit();
  }
}
