import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionDeleteComponent } from './permission-delete.component';

describe('PermissionDeleteComponent', () => {
  let component: PermissionDeleteComponent;
  let fixture: ComponentFixture<PermissionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
