import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlergiaListPage } from './alergia-list.page';

describe('AlergiaListPage', () => {
  let component: AlergiaListPage;
  let fixture: ComponentFixture<AlergiaListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlergiaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
