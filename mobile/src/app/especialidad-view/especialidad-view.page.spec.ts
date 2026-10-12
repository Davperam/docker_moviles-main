import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecialidadViewPage } from './especialidad-view.page';

describe('EspecialidadViewPage', () => {
  let component: EspecialidadViewPage;
  let fixture: ComponentFixture<EspecialidadViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
