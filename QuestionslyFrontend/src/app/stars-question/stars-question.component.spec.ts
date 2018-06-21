import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsQuestionComponent } from './stars-question.component';

describe('StarsQuestionComponent', () => {
  let component: StarsQuestionComponent;
  let fixture: ComponentFixture<StarsQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
