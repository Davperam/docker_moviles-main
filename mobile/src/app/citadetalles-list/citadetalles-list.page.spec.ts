import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitadetallesListPage } from './citadetalles-list.page';

describe('CitadetallesListPage', () => {
  let component: CitadetallesListPage;
  let fixture: ComponentFixture<CitadetallesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitadetallesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
