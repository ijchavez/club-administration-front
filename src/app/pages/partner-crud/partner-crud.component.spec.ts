import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCrudComponent } from './partner-crud.component';

describe('TablesComponent', () => {
  let component: PartnerCrudComponent;
  let fixture: ComponentFixture<PartnerCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
