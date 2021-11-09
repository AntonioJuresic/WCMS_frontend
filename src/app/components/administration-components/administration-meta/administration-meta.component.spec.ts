import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationMetaComponent } from './administration-meta.component';

describe('AdministrationMetaComponent', () => {
  let component: AdministrationMetaComponent;
  let fixture: ComponentFixture<AdministrationMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
