import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodopagoListPage } from './metodopago-list.page';

describe('MetodopagoListPage', () => {
  let component: MetodopagoListPage;
  let fixture: ComponentFixture<MetodopagoListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodopagoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
