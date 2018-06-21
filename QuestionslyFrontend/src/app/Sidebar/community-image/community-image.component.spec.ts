import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityImageComponent } from './community-image.component';

describe('CommunityImageComponent', () => {
  let component: CommunityImageComponent;
  let fixture: ComponentFixture<CommunityImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
