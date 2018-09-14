import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';

import { AddVideo, EditVideo, DeleteVideo, FetchVideos } from '../actions/video.actions';
import { Video } from '../interfaces/video.interface';
import { VideosService } from '@app/videos/shared/services/videos.service';


export class VideoStateModel {
    videos: Video[];
}

@State<VideoStateModel>({
    name: 'videos',
    defaults: {
        videos: []
    }
})
export class VideoState implements NgxsOnInit {

    constructor(private readonly videosService: VideosService) { }

    @Selector()
    static getAllVideos(state: VideoStateModel) {
        return state.videos;
    }

    async ngxsOnInit(ctx: StateContext<VideoStateModel>) {
        return ctx.dispatch(new FetchVideos());
    }

    @Action(FetchVideos)
    async fetchAll({ getState, patchState }: StateContext<VideoStateModel>) {
        const state = getState();
        const videos = await this.videosService.getAll().toPromise();
        patchState({ ...state, videos });
    }


    // @Action(AddTodo)
    // feedAnimals(ctx: StateContext<TodoListModel>, action: AddTodo) {

    //     // ngxs will subscribe to the post observable for you if you return it from the action
    //     return this.http.post('/api/todo-list').pipe(

    //         // we use a tap here, since mutating the state is a side effect
    //         tap(newTodo) => {
    //             const state = ctx.getState();
    //             ctx.setState({
    //                 ...state,
    //                 todolist: [...state.todolist, newTodo]
    //             });
    //         }),
    //         // if the post goes sideways we need to handle it
    //         catchError(error => window.alert('could not add todo')), ;
    // )
    // }

    @Action(AddVideo)
    add({ getState, patchState }: StateContext<VideoStateModel>, { payload }: AddVideo) {
        const state = getState();
        patchState({
            videos: [...state.videos, payload]
        });
    }

    @Action(EditVideo)
    edit({ getState, patchState }: StateContext<VideoStateModel>, { payload }: EditVideo) {
        const state = getState();
        patchState({
            videos: [...state.videos.filter(video => video.id !== payload.id), payload]
        });
    }

    @Action(DeleteVideo)
    remove({ getState, patchState }: StateContext<VideoStateModel>, { payload }: DeleteVideo) {
        const state = getState();
        patchState({
            videos: [...state.videos.filter(video => video.id !== payload)]
        });
    }

}
