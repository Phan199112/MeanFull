import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionItemComponent } from './discussion-item.component';

describe('DiscussionItemComponent', () => {
  let component: DiscussionItemComponent;
  let fixture: ComponentFixture<DiscussionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
