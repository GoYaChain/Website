import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresaleComponent } from './presale.component';

describe('PresaleComponent', () => {
  let component: PresaleComponent;
  let fixture: ComponentFixture<PresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
