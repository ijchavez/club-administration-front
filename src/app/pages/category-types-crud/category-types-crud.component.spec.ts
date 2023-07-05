import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTypesComponent } from './category-types-crud.component';

describe('TablesComponent', () => {
  let component: CategoryTypesComponent;
  let fixture: ComponentFixture<CategoryTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
