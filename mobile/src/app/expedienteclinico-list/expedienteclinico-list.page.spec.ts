import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedienteclinicoListPage } from './expedienteclinico-list.page';

describe('ExpedienteclinicoListPage', () => {
  let component: ExpedienteclinicoListPage;
  let fixture: ComponentFixture<ExpedienteclinicoListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteclinicoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
