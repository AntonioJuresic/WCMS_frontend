import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSendCodeComponent } from './password-send-code.component';

describe('PasswordSendCodeComponent', () => {
  let component: PasswordSendCodeComponent;
  let fixture: ComponentFixture<PasswordSendCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordSendCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSendCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
