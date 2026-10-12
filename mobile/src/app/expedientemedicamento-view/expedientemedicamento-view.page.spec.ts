import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedientemedicamentoViewPage } from './expedientemedicamento-view.page';

describe('ExpedientemedicamentoViewPage', () => {
  let component: ExpedientemedicamentoViewPage;
  let fixture: ComponentFixture<ExpedientemedicamentoViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientemedicamentoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
