import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentosListPage } from './medicamentos-list.page';

describe('MedicamentosListPage', () => {
  let component: MedicamentosListPage;
  let fixture: ComponentFixture<MedicamentosListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
