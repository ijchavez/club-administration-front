import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionSuggestedComponent } from './contribution-suggested.component';

describe('TablesComponent', () => {
  let component: ContributionSuggestedComponent;
  let fixture: ComponentFixture<ContributionSuggestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionSuggestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionSuggestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
