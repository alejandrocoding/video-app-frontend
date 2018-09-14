import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { VideoState } from '../shared/state/video.state';
import { Video } from '../shared/interfaces/video.interface';

@Component({
  selector: 'app-videos-view',
  templateUrl: './videos-view.component.html',
  styleUrls: ['./videos-view.component.scss']
})
export class VideosViewComponent implements OnInit {

  @Select(VideoState.getAllVideos) videos$: Observable<Video[]>;

  constructor(private readonly store: Store) { }

  ngOnInit() {
  }

}
