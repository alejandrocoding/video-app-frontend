import { Component, OnInit, Input } from '@angular/core';

import { Video } from '../shared/interfaces/video.interface';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {

  @Input() videos: Video[];

  constructor() { }

  ngOnInit() {
  }

}
