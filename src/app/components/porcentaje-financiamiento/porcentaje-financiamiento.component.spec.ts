import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeFinanciamientoComponent } from './porcentaje-financiamiento.component';

describe('PorcentajeFinanciamientoComponent', () => {
  let component: PorcentajeFinanciamientoComponent;
  let fixture: ComponentFixture<PorcentajeFinanciamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorcentajeFinanciamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcentajeFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
