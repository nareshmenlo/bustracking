import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRoutesPage } from './bus-routes.page';

describe('BusRoutesPage', () => {
  let component: BusRoutesPage;
  let fixture: ComponentFixture<BusRoutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusRoutesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
