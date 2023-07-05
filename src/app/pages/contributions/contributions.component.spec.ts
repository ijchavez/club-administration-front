import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsComponent } from './contributions.component';

describe('TablesComponent', () => {
  let component: ContributionsComponent;
  let fixture: ComponentFixture<ContributionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
