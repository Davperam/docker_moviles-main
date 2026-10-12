import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedientemedicamentoListPage } from './expedientemedicamento-list.page';

describe('ExpedientemedicamentoListPage', () => {
  let component: ExpedientemedicamentoListPage;
  let fixture: ComponentFixture<ExpedientemedicamentoListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientemedicamentoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
