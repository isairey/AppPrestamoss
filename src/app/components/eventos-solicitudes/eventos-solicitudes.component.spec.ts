import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosSolicitudesComponent } from './eventos-solicitudes.component';

describe('EventosSolicitudesComponent', () => {
  let component: EventosSolicitudesComponent;
  let fixture: ComponentFixture<EventosSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
