import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteOdontogramasPage } from './paciente-odontogramas.page';

describe('PacienteOdontogramasPage', () => {
  let component: PacienteOdontogramasPage;
  let fixture: ComponentFixture<PacienteOdontogramasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteOdontogramasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
