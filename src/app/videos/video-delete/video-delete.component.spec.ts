import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDeleteComponent } from './video-delete.component';

describe('VideoDeleteComponent', () => {
  let component: VideoDeleteComponent;
  let fixture: ComponentFixture<VideoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
