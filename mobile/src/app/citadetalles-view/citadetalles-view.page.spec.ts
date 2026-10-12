import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitadetallesViewPage } from './citadetalles-view.page';

describe('CitadetallesViewPage', () => {
  let component: CitadetallesViewPage;
  let fixture: ComponentFixture<CitadetallesViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitadetallesViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
