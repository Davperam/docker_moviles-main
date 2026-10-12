import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitasListPage } from './citas-list.page';

describe('CitasListPage', () => {
  let component: CitasListPage;
  let fixture: ComponentFixture<CitasListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
