import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWebsiteFooterComponent } from './editor-website-footer.component';

describe('EditorWebsiteFooterComponent', () => {
  let component: EditorWebsiteFooterComponent;
  let fixture: ComponentFixture<EditorWebsiteFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorWebsiteFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWebsiteFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
