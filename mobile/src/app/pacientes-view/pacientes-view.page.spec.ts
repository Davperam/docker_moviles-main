import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacientesViewPage } from './pacientes-view.page';

describe('PacientesViewPage', () => {
  let component: PacientesViewPage;
  let fixture: ComponentFixture<PacientesViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
