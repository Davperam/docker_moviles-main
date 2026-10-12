import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadocitaListPage } from './estadocita-list.page';

describe('EstadocitaListPage', () => {
  let component: EstadocitaListPage;
  let fixture: ComponentFixture<EstadocitaListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadocitaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
