import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagosFormPage } from './pagos-form.page';

describe('PagosFormPage', () => {
  let component: PagosFormPage;
  let fixture: ComponentFixture<PagosFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
