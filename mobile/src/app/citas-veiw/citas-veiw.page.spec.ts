import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitasVeiwPage } from './citas-veiw.page';

describe('CitasVeiwPage', () => {
  let component: CitasVeiwPage;
  let fixture: ComponentFixture<CitasVeiwPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasVeiwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
