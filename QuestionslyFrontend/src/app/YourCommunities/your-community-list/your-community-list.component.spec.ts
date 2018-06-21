import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCommunityListComponent } from './your-community-list.component';

describe('YourCommunityListComponent', () => {
  let component: YourCommunityListComponent;
  let fixture: ComponentFixture<YourCommunityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourCommunityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCommunityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
