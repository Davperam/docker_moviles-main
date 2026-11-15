import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteNotaclinicaPage } from './paciente-notaclinica.page';

describe('PacienteNotaclinicaPage', () => {
  let component: PacienteNotaclinicaPage;
  let fixture: ComponentFixture<PacienteNotaclinicaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteNotaclinicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
