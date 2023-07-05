import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsCrudComponent } from './contributions-crud.component';

describe('TablesComponent', () => {
  let component: ContributionsCrudComponent;
  let fixture: ComponentFixture<ContributionsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionsCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
