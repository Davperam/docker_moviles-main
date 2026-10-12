import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosclinicosViewPage } from './documentosclinicos-view.page';

describe('DocumentosclinicosViewPage', () => {
  let component: DocumentosclinicosViewPage;
  let fixture: ComponentFixture<DocumentosclinicosViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosclinicosViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
