import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteMetaComponent } from './website-meta.component';

describe('WebsiteMetaComponent', () => {
  let component: WebsiteMetaComponent;
  let fixture: ComponentFixture<WebsiteMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
