import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReqProductComponent } from './add-req-product.component';

describe('AddReqProductComponent', () => {
  let component: AddReqProductComponent;
  let fixture: ComponentFixture<AddReqProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReqProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReqProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
