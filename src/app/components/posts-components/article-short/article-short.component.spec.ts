import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleShortComponent } from './article-short.component';

describe('ArticleShortComponent', () => {
  let component: ArticleShortComponent;
  let fixture: ComponentFixture<ArticleShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
