import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteExpedientePage } from './paciente-expediente.page';

describe('PacienteExpedientePage', () => {
  let component: PacienteExpedientePage;
  let fixture: ComponentFixture<PacienteExpedientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteExpedientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
