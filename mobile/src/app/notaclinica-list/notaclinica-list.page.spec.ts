import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaclinicaListPage } from './notaclinica-list.page';

describe('NotaclinicaListPage', () => {
  let component: NotaclinicaListPage;
  let fixture: ComponentFixture<NotaclinicaListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaclinicaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
