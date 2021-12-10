import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialrecordComponent } from './socialrecord.component';

describe('SocialrecordComponent', () => {
  let component: SocialrecordComponent;
  let fixture: ComponentFixture<SocialrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialrecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
