import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitasFormPage } from './citas-form.page';

describe('CitasFormPage', () => {
  let component: CitasFormPage;
  let fixture: ComponentFixture<CitasFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
