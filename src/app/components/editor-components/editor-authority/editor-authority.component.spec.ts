import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAuthorityComponent } from './editor-authority.component';

describe('EditorAuthorityComponent', () => {
  let component: EditorAuthorityComponent;
  let fixture: ComponentFixture<EditorAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorAuthorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
