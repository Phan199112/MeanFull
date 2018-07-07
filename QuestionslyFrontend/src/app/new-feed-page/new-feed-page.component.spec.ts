import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeedPageComponent } from './new-feed-page.component';

describe('NewFeedPageComponent', () => {
  let component: NewFeedPageComponent;
  let fixture: ComponentFixture<NewFeedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
