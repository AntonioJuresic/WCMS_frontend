import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPostsComponent } from './administration-posts.component';

describe('AdministrationPostsComponent', () => {
  let component: AdministrationPostsComponent;
  let fixture: ComponentFixture<AdministrationPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
