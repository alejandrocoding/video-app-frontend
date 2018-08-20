import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';

import { VideosViewComponent } from './videos-view/videos-view.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { VideoDeleteComponent } from './video-delete/video-delete.component';

@NgModule({
  imports: [
    CommonModule,
    VideosRoutingModule
  ],
  declarations: [
    VideosComponent,
    VideosViewComponent,
    VideoDetailsComponent,
    VideoCardComponent,
    VideoAddComponent,
    VideoEditComponent,
    VideoDeleteComponent
  ]
})
export class VideosModule { }
