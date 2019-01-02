import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginButtonComponent } from './user-login-button.component';

describe('UserLoginButtonComponent', () => {
  let component: UserLoginButtonComponent;
  let fixture: ComponentFixture<UserLoginButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
