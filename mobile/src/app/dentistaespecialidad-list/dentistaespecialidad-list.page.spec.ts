import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DentistaespecialidadListPage } from './dentistaespecialidad-list.page';

describe('DentistaespecialidadListPage', () => {
  let component: DentistaespecialidadListPage;
  let fixture: ComponentFixture<DentistaespecialidadListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistaespecialidadListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
