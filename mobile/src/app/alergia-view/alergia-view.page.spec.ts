import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlergiaViewPage } from './alergia-view.page';

describe('AlergiaViewPage', () => {
  let component: AlergiaViewPage;
  let fixture: ComponentFixture<AlergiaViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlergiaViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
