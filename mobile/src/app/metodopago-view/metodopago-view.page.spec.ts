import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodopagoViewPage } from './metodopago-view.page';

describe('MetodopagoViewPage', () => {
  let component: MetodopagoViewPage;
  let fixture: ComponentFixture<MetodopagoViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodopagoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
