import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberQuestionFormComponent } from './number-question-form.component';

describe('NumberQuestionFormComponent', () => {
  let component: NumberQuestionFormComponent;
  let fixture: ComponentFixture<NumberQuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberQuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
