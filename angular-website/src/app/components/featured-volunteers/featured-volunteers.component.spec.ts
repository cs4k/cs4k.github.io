import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedVolunteersComponent } from './featured-volunteers.component';

describe('FeaturedVolunteersComponent', () => {
  let component: FeaturedVolunteersComponent;
  let fixture: ComponentFixture<FeaturedVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
