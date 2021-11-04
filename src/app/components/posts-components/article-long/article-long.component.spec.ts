import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLongComponent } from './article-long.component';

describe('ArticleLongComponent', () => {
  let component: ArticleLongComponent;
  let fixture: ComponentFixture<ArticleLongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
