import { Video } from '../interfaces/video.interface';

export class FetchVideos {
    static readonly type = '[VIDEO] Fetch';
}

export class AddVideo {
    static readonly type = '[VIDEO] Add';
    constructor(public payload: Video) { }
}

export class EditVideo {
    static readonly type = '[VIDEO] Edit';
    constructor(public payload: Video) { }
}

export class DeleteVideo {
    static readonly type = '[VIDEO] Delete';
    constructor(public payload: string) { }
}
