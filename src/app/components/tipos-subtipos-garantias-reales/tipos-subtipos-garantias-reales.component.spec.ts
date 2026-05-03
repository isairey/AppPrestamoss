import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposSubtiposGarantiasRealesComponent } from './tipos-subtipos-garantias-reales.component';

describe('TiposSubtiposGarantiasRealesComponent', () => {
  let component: TiposSubtiposGarantiasRealesComponent;
  let fixture: ComponentFixture<TiposSubtiposGarantiasRealesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposSubtiposGarantiasRealesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposSubtiposGarantiasRealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
