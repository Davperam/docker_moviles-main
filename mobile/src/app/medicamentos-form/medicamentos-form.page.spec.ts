import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentosFormPage } from './medicamentos-form.page';

describe('MedicamentosFormPage', () => {
  let component: MedicamentosFormPage;
  let fixture: ComponentFixture<MedicamentosFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
