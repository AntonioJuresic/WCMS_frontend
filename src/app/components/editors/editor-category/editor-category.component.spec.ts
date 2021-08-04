import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCategoryComponent } from './editor-category.component';

describe('EditorCategoryComponent', () => {
  let component: EditorCategoryComponent;
  let fixture: ComponentFixture<EditorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
