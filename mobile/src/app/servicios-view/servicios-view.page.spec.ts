import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosViewPage } from './servicios-view.page';

describe('ServiciosViewPage', () => {
  let component: ServiciosViewPage;
  let fixture: ComponentFixture<ServiciosViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
