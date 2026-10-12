import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DentistasListPage } from './dentistas-list.page';

describe('DentistasListPage', () => {
  let component: DentistasListPage;
  let fixture: ComponentFixture<DentistasListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
