import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagBannerListComponent } from './tag-banner-list.component';

describe('TagBannerListComponent', () => {
  let component: TagBannerListComponent;
  let fixture: ComponentFixture<TagBannerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagBannerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
