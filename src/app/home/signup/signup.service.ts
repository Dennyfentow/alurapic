import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';

const API_URL = "http://localhost:3000"
@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    constructor(private httpClient: HttpClient) {

    }

    checkUsernameTaken(username: string) {
        return this.httpClient.get(API_URL + '/user/exists/'+ username);
    }

    sigup(newUser: NewUser) {
        return this.httpClient.post(API_URL + '/user/signup', newUser)
    }
}