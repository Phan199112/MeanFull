import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnswerFormComponent } from './short-answer-form.component';

describe('ShortAnswerFormComponent', () => {
  let component: ShortAnswerFormComponent;
  let fixture: ComponentFixture<ShortAnswerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortAnswerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
