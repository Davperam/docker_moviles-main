import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosFormPage } from './servicios-form.page';

describe('ServiciosFormPage', () => {
  let component: ServiciosFormPage;
  let fixture: ComponentFixture<ServiciosFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
