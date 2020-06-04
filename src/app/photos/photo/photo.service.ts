import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { map } from 'rxjs/operators';

const API = 'http://localhost:3000'

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(username: string) {
        // const observable = http.get('http://localhost:3000/flavio/photos');
        // observable.subscribe(photos => this.photos = photos);
        return this.http
            .get<Photo[]>(`${API}/${username}/photos`);
    }

    listFromUserPaginated(username: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());
        return this.http
            .get<Photo[]>(`${API}/${username}/photos`, { params });
    }

    upload(description: string, allowComments: boolean, file: File) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(API + '/photos/upload', formData);
    }

    findById(id: number) {
        return this.http.get<Photo>(API + '/photos/' + id);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string) {

        return this.http.post(
            API + '/photos/' + photoId + '/comments',
            { commentText }
        );
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

}
