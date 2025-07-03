import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowDesktopComponent } from './window-desktop.component';

describe('WindowDesktopComponent', () => {
  let component: WindowDesktopComponent;
  let fixture: ComponentFixture<WindowDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowDesktopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
