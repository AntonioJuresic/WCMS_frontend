import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWebsiteMetaComponent } from './editor-website-meta.component';

describe('EditorWebsiteMetaComponent', () => {
  let component: EditorWebsiteMetaComponent;
  let fixture: ComponentFixture<EditorWebsiteMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorWebsiteMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWebsiteMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
