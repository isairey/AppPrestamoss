import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaArchivosComponent } from './limpieza-archivos.component';

describe('LimpiezaArchivosComponent', () => {
  let component: LimpiezaArchivosComponent;
  let fixture: ComponentFixture<LimpiezaArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimpiezaArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezaArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
