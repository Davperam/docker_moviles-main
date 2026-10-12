import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DentistasFormPage } from './dentistas-form.page';

describe('DentistasFormPage', () => {
  let component: DentistasFormPage;
  let fixture: ComponentFixture<DentistasFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistasFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
