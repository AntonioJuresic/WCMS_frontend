import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWebsiteHeaderComponent } from './editor-website-header.component';

describe('EditorWebsiteHeaderComponent', () => {
  let component: EditorWebsiteHeaderComponent;
  let fixture: ComponentFixture<EditorWebsiteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorWebsiteHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWebsiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
