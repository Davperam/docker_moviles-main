import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedienteclinicoFormPage } from './expedienteclinico-form.page';

describe('ExpedienteclinicoFormPage', () => {
  let component: ExpedienteclinicoFormPage;
  let fixture: ComponentFixture<ExpedienteclinicoFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteclinicoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
