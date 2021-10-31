import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationInvitationsComponent } from './administration-invitations.component';

describe('AdministrationInvitationsComponent', () => {
  let component: AdministrationInvitationsComponent;
  let fixture: ComponentFixture<AdministrationInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationInvitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
