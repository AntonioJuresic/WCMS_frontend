import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorUserComponent } from './editor-user.component';

describe('EditorUserComponent', () => {
  let component: EditorUserComponent;
  let fixture: ComponentFixture<EditorUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
