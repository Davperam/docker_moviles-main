import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecialidadListPage } from './especialidad-list.page';

describe('EspecialidadListPage', () => {
  let component: EspecialidadListPage;
  let fixture: ComponentFixture<EspecialidadListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
