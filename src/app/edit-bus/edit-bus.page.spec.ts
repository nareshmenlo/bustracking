import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusPage } from './edit-bus.page';

describe('EditBusPage', () => {
  let component: EditBusPage;
  let fixture: ComponentFixture<EditBusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
