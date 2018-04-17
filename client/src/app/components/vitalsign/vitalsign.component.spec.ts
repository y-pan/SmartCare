import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsignComponent } from './vitalsign.component';

describe('VitalsignComponent', () => {
  let component: VitalsignComponent;
  let fixture: ComponentFixture<VitalsignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalsignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
