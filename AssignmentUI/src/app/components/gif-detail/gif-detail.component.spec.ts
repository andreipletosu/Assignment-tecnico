import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifDetailComponent } from './gif-detail.component';

describe('GifDetailComponent', () => {
  let component: GifDetailComponent;
  let fixture: ComponentFixture<GifDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GifDetailComponent]
    });
    fixture = TestBed.createComponent(GifDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
