import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedientealergiaListPage } from './expedientealergia-list.page';

describe('ExpedientealergiaListPage', () => {
  let component: ExpedientealergiaListPage;
  let fixture: ComponentFixture<ExpedientealergiaListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientealergiaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
