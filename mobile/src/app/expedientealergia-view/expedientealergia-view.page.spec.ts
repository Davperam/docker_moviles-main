import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedientealergiaViewPage } from './expedientealergia-view.page';

describe('ExpedientealergiaViewPage', () => {
  let component: ExpedientealergiaViewPage;
  let fixture: ComponentFixture<ExpedientealergiaViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientealergiaViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
