import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBusPage } from './delete-bus.page';

describe('DeleteBusPage', () => {
  let component: DeleteBusPage;
  let fixture: ComponentFixture<DeleteBusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
