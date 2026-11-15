import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteCitasPage } from './paciente-citas.page';

describe('PacienteCitasPage', () => {
  let component: PacienteCitasPage;
  let fixture: ComponentFixture<PacienteCitasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
