import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosclinicosListPage } from './documentosclinicos-list.page';

describe('DocumentosclinicosListPage', () => {
  let component: DocumentosclinicosListPage;
  let fixture: ComponentFixture<DocumentosclinicosListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosclinicosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
