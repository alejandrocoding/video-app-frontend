import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment/environment';
import { Video } from '../interfaces/video.interface';

@Injectable()
export class VideosService {

    constructor(private readonly http: HttpClient) { }

    getAll() {
        return this.http.get<Video[]>(`${environment.api}/videos`);
    }

}
