import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecialidadFormPage } from './especialidad-form.page';

describe('EspecialidadFormPage', () => {
  let component: EspecialidadFormPage;
  let fixture: ComponentFixture<EspecialidadFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
