import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaclinicaFormPage } from './notaclinica-form.page';

describe('NotaclinicaFormPage', () => {
  let component: NotaclinicaFormPage;
  let fixture: ComponentFixture<NotaclinicaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaclinicaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
