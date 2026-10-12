import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitadetallesFormPage } from './citadetalles-form.page';

describe('CitadetallesFormPage', () => {
  let component: CitadetallesFormPage;
  let fixture: ComponentFixture<CitadetallesFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitadetallesFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
