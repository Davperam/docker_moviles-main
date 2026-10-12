import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagosViewPage } from './pagos-view.page';

describe('PagosViewPage', () => {
  let component: PagosViewPage;
  let fixture: ComponentFixture<PagosViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
