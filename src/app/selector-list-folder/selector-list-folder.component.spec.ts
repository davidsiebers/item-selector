import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorListFolderComponent } from './selector-list-folder.component';

describe('SelectorListFolderComponent', () => {
  let component: SelectorListFolderComponent;
  let fixture: ComponentFixture<SelectorListFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorListFolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorListFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
