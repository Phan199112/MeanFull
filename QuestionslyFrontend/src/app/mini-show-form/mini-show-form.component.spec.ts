import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniShowFormComponent } from './mini-show-form.component';

describe('MiniShowFormComponent', () => {
  let component: MiniShowFormComponent;
  let fixture: ComponentFixture<MiniShowFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniShowFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniShowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
