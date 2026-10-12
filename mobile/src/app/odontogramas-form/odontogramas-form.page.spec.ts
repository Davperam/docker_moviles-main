import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OdontogramasFormPage } from './odontogramas-form.page';

describe('OdontogramasFormPage', () => {
  let component: OdontogramasFormPage;
  let fixture: ComponentFixture<OdontogramasFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontogramasFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
