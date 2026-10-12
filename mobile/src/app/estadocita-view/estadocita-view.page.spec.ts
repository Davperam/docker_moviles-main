import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadocitaViewPage } from './estadocita-view.page';

describe('EstadocitaViewPage', () => {
  let component: EstadocitaViewPage;
  let fixture: ComponentFixture<EstadocitaViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadocitaViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
