import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentosViewPage } from './medicamentos-view.page';

describe('MedicamentosViewPage', () => {
  let component: MedicamentosViewPage;
  let fixture: ComponentFixture<MedicamentosViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
