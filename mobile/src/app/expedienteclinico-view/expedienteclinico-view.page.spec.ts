import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedienteclinicoViewPage } from './expedienteclinico-view.page';

describe('ExpedienteclinicoViewPage', () => {
  let component: ExpedienteclinicoViewPage;
  let fixture: ComponentFixture<ExpedienteclinicoViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteclinicoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
