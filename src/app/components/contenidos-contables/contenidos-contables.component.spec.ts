import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosContablesComponent } from './contenidos-contables.component';

describe('ContenidosContablesComponent', () => {
  let component: ContenidosContablesComponent;
  let fixture: ComponentFixture<ContenidosContablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosContablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosContablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
