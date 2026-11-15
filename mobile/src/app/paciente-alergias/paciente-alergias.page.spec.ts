import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteAlergiasPage } from './paciente-alergias.page';

describe('PacienteAlergiasPage', () => {
  let component: PacienteAlergiasPage;
  let fixture: ComponentFixture<PacienteAlergiasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteAlergiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
