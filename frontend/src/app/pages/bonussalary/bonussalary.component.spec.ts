import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonussalaryComponent } from './bonussalary.component';

describe('BonussalaryComponent', () => {
  let component: BonussalaryComponent;
  let fixture: ComponentFixture<BonussalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonussalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonussalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
