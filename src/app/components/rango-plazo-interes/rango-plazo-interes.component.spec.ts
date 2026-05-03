import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangoPlazoInteresComponent } from './rango-plazo-interes.component';

describe('RangoPlazoInteresComponent', () => {
  let component: RangoPlazoInteresComponent;
  let fixture: ComponentFixture<RangoPlazoInteresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangoPlazoInteresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangoPlazoInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
