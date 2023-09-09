import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchUserPage } from './search-user.page';

describe('SearchUserPage', () => {
  let component: SearchUserPage;
  let fixture: ComponentFixture<SearchUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
