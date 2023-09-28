import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsPage } from './charts.page';

describe('ChartsPage', () => {
  let component: ChartsPage;
  let fixture: ComponentFixture<ChartsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
