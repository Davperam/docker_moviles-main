import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadocitaFormPage } from './estadocita-form.page';

describe('EstadocitaFormPage', () => {
  let component: EstadocitaFormPage;
  let fixture: ComponentFixture<EstadocitaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadocitaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
