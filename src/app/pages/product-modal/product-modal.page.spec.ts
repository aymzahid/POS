import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductModalPage } from './product-modal.page';

describe('ProductModalPage', () => {
  let component: ProductModalPage;
  let fixture: ComponentFixture<ProductModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
