import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTestComponent } from './articles-test.component';

describe('ArticlesTestComponent', () => {
  let component: ArticlesTestComponent;
  let fixture: ComponentFixture<ArticlesTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
