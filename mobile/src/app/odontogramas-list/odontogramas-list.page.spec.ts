import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OdontogramasListPage } from './odontogramas-list.page';

describe('OdontogramasListPage', () => {
  let component: OdontogramasListPage;
  let fixture: ComponentFixture<OdontogramasListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontogramasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
