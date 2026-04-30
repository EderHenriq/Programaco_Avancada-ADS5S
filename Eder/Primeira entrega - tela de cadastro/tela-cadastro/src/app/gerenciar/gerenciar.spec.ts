import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gerenciar } from './gerenciar';

describe('Gerenciar', () => {
  let component: Gerenciar;
  let fixture: ComponentFixture<Gerenciar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gerenciar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gerenciar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
