import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationWebsiteInfoComponent } from './administration-website-info.component';

describe('AdministrationWebsiteInfoComponent', () => {
  let component: AdministrationWebsiteInfoComponent;
  let fixture: ComponentFixture<AdministrationWebsiteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationWebsiteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationWebsiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
