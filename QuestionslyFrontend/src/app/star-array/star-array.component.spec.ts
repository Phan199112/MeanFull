import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarArrayComponent } from './star-array.component';

describe('StarArrayComponent', () => {
  let component: StarArrayComponent;
  let fixture: ComponentFixture<StarArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
