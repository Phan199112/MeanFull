import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkItemComponent } from './network-item.component';

describe('NetworkItemComponent', () => {
  let component: NetworkItemComponent;
  let fixture: ComponentFixture<NetworkItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
