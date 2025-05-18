import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorListItemComponent } from './selector-list-item.component';

describe('SelectorListItemComponent', () => {
  let component: SelectorListItemComponent;
  let fixture: ComponentFixture<SelectorListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
