import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorUserAuthorityComponent } from './editor-user-authority.component';

describe('EditorUserAuthorityComponent', () => {
  let component: EditorUserAuthorityComponent;
  let fixture: ComponentFixture<EditorUserAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorUserAuthorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorUserAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
