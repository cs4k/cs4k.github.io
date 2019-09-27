import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolContactComponent } from './school-contact.component';

describe('SchoolContactComponent', () => {
  let component: SchoolContactComponent;
  let fixture: ComponentFixture<SchoolContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
