import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { admissionComponent } from './admission.component';

describe('AdmissionComponent', () => {
  let component: admissionComponent;
  let fixture: ComponentFixture<admissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ admissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(admissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
