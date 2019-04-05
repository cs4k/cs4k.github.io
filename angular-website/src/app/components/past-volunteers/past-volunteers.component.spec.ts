import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastVolunteersComponent } from './past-volunteers.component';

describe('PastVolunteersComponent', () => {
  let component: PastVolunteersComponent;
  let fixture: ComponentFixture<PastVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
