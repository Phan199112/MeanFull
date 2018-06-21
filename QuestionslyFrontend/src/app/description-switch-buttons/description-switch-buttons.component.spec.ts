import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSwitchButtonsComponent } from './description-switch-buttons.component';

describe('DescriptionSwitchButtonsComponent', () => {
  let component: DescriptionSwitchButtonsComponent;
  let fixture: ComponentFixture<DescriptionSwitchButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionSwitchButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionSwitchButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
