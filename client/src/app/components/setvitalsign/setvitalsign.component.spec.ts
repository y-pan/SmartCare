import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetvitalsignComponent } from './setvitalsign.component';

describe('SetvitalsignComponent', () => {
  let component: SetvitalsignComponent;
  let fixture: ComponentFixture<SetvitalsignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetvitalsignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetvitalsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
