import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacientesListPage } from './pacientes-list.page';

describe('PacientesListPage', () => {
  let component: PacientesListPage;
  let fixture: ComponentFixture<PacientesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
