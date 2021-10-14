import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationCommentsComponent } from './administration-comments.component';

describe('AdministrationCommentsComponent', () => {
  let component: AdministrationCommentsComponent;
  let fixture: ComponentFixture<AdministrationCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
