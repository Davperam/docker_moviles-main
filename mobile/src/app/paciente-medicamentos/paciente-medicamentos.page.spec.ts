import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteMedicamentosPage } from './paciente-medicamentos.page';

describe('PacienteMedicamentosPage', () => {
  let component: PacienteMedicamentosPage;
  let fixture: ComponentFixture<PacienteMedicamentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteMedicamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
