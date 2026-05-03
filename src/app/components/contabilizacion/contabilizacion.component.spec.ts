import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilizacionComponent } from './contabilizacion.component';

describe('ContabilizacionComponent', () => {
  let component: ContabilizacionComponent;
  let fixture: ComponentFixture<ContabilizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContabilizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContabilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
