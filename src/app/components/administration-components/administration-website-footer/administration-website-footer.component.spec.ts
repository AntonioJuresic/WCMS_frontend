import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationWebsiteFooterComponent } from './administration-website-footer.component';

describe('AdministrationWebsiteFooterComponent', () => {
  let component: AdministrationWebsiteFooterComponent;
  let fixture: ComponentFixture<AdministrationWebsiteFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationWebsiteFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationWebsiteFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
