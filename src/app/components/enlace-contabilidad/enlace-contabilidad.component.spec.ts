import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlaceContabilidadComponent } from './enlace-contabilidad.component';

describe('EnlaceContabilidadComponent', () => {
  let component: EnlaceContabilidadComponent;
  let fixture: ComponentFixture<EnlaceContabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlaceContabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlaceContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
