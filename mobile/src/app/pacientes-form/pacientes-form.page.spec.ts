import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacientesFormPage } from './pacientes-form.page';

describe('PacientesFormPage', () => {
  let component: PacientesFormPage;
  let fixture: ComponentFixture<PacientesFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
