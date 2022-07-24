import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitepaperComponent } from './litepaper.component';

describe('LitepaperComponent', () => {
  let component: LitepaperComponent;
  let fixture: ComponentFixture<LitepaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitepaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LitepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
