import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DentistasViewPage } from './dentistas-view.page';

describe('DentistasViewPage', () => {
  let component: DentistasViewPage;
  let fixture: ComponentFixture<DentistasViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistasViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
