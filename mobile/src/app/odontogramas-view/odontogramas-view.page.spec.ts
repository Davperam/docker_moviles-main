import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OdontogramasViewPage } from './odontogramas-view.page';

describe('OdontogramasViewPage', () => {
  let component: OdontogramasViewPage;
  let fixture: ComponentFixture<OdontogramasViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontogramasViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
