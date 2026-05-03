import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosProductoComponent } from './documentos-producto.component';

describe('DocumentosProductoComponent', () => {
  let component: DocumentosProductoComponent;
  let fixture: ComponentFixture<DocumentosProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
