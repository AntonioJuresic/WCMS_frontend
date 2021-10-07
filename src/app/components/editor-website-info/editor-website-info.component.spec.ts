import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWebsiteInfoComponent } from './editor-website-info.component';

describe('EditorWebsiteInfoComponent', () => {
  let component: EditorWebsiteInfoComponent;
  let fixture: ComponentFixture<EditorWebsiteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorWebsiteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWebsiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
