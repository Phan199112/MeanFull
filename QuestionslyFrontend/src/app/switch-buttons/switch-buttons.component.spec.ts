import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchButtonsComponent } from './switch-buttons.component';

describe('SwitchButtonsComponent', () => {
  let component: SwitchButtonsComponent;
  let fixture: ComponentFixture<SwitchButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
