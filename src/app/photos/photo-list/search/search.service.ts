import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class searchService {
    searchDataSource: Subject<string> = new Subject<string>();

    setTextSearch(text: string) {
        this.searchDataSource.next(text);
    }

    asObsSearch() {
        return this.searchDataSource.asObservable();
    }
}