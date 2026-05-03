import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelesContabilizacionComponent } from './niveles-contabilizacion.component';

describe('NivelesContabilizacionComponent', () => {
  let component: NivelesContabilizacionComponent;
  let fixture: ComponentFixture<NivelesContabilizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelesContabilizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelesContabilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
