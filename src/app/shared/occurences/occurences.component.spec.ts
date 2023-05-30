import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurencesComponent } from './occurences.component';

describe('OccurencesComponent', () => {
  let component: OccurencesComponent;
  let fixture: ComponentFixture<OccurencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccurencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
