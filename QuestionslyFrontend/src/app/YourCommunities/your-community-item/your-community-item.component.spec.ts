import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCommunityItemComponent } from './your-community-item.component';

describe('YourCommunityItemComponent', () => {
  let component: YourCommunityItemComponent;
  let fixture: ComponentFixture<YourCommunityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourCommunityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCommunityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
