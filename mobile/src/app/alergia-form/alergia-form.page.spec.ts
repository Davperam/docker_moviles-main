import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlergiaFormPage } from './alergia-form.page';

describe('AlergiaFormPage', () => {
  let component: AlergiaFormPage;
  let fixture: ComponentFixture<AlergiaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlergiaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
