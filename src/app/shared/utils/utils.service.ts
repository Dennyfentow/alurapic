import { Injectable } from '@angular/core';

@Injectable()
export class UtilService { 

    getStringWithRegex(value: String , regex: RegExp): string{
        return value.match(regex).shift();
    }
}