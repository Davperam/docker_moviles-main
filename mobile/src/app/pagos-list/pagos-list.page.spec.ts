import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagosListPage } from './pagos-list.page';

describe('PagosListPage', () => {
  let component: PagosListPage;
  let fixture: ComponentFixture<PagosListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
