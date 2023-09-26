import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoryPage } from './add-category.page';

describe('AddCategoryPage', () => {
  let component: AddCategoryPage;
  let fixture: ComponentFixture<AddCategoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
