import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosPrestamosComponent } from './estados-prestamos.component';

describe('EstadosPrestamosComponent', () => {
  let component: EstadosPrestamosComponent;
  let fixture: ComponentFixture<EstadosPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadosPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
