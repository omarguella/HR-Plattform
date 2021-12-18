import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedBonussalariesComponent } from './closed-bonussalaries.component';

describe('ClosedBonussalariesComponent', () => {
  let component: ClosedBonussalariesComponent;
  let fixture: ComponentFixture<ClosedBonussalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedBonussalariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedBonussalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
