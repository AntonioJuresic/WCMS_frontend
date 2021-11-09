import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteHeadComponent } from './website-head.component';

describe('WebsiteHeadComponent', () => {
  let component: WebsiteHeadComponent;
  let fixture: ComponentFixture<WebsiteHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
