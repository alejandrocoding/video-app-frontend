import { Component, OnInit } from '@angular/core';
import { VideosService } from '@app/videos/shared/services/videos.service';

@Component({
  selector: 'app-videos-view',
  templateUrl: './videos-view.component.html',
  styleUrls: ['./videos-view.component.scss']
})
export class VideosViewComponent implements OnInit {

  constructor(private readonly videosService: VideosService) { }

  ngOnInit() {
    this.videosService.getAll().subscribe(videos => console.log(videos));
  }

}
