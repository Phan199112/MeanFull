import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeFormComponent } from './take-form.component';

describe('TakeFormComponent', () => {
  let component: TakeFormComponent;
  let fixture: ComponentFixture<TakeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
