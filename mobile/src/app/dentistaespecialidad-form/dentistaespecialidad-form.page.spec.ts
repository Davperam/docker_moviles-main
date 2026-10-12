import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DentistaespecialidadFormPage } from './dentistaespecialidad-form.page';

describe('DentistaespecialidadFormPage', () => {
  let component: DentistaespecialidadFormPage;
  let fixture: ComponentFixture<DentistaespecialidadFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistaespecialidadFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
