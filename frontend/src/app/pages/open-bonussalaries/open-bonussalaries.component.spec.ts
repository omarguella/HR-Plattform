import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBonussalariesComponent } from './open-bonussalaries.component';

describe('OpenBonussalariesComponent', () => {
  let component: OpenBonussalariesComponent;
  let fixture: ComponentFixture<OpenBonussalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenBonussalariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBonussalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
