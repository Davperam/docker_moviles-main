import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaclinicaViewPage } from './notaclinica-view.page';

describe('NotaclinicaViewPage', () => {
  let component: NotaclinicaViewPage;
  let fixture: ComponentFixture<NotaclinicaViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaclinicaViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
