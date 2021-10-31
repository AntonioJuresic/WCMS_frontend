import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorInvitationComponent } from './editor-invitation.component';

describe('EditorInvitationComponent', () => {
  let component: EditorInvitationComponent;
  let fixture: ComponentFixture<EditorInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorInvitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
