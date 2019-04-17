import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReqProductComponent } from './view-req-product.component';

describe('ViewReqProductComponent', () => {
  let component: ViewReqProductComponent;
  let fixture: ComponentFixture<ViewReqProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReqProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReqProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
