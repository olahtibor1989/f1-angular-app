import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitListComponent } from './circuit-list.component';

describe('CircuitListComponent', () => {
  let component: CircuitListComponent;
  let fixture: ComponentFixture<CircuitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
