import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationAuthoritiesComponent } from './administration-authorities.component';

describe('AdministrationAuthoritiesComponent', () => {
  let component: AdministrationAuthoritiesComponent;
  let fixture: ComponentFixture<AdministrationAuthoritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationAuthoritiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
