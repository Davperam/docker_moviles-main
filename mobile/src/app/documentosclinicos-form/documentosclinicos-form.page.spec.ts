import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosclinicosFormPage } from './documentosclinicos-form.page';

describe('DocumentosclinicosFormPage', () => {
  let component: DocumentosclinicosFormPage;
  let fixture: ComponentFixture<DocumentosclinicosFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosclinicosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
