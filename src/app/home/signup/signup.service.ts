import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { environment } from 'src/environments/environment';

const API = environment.Apiurl;

@Injectable()
export class SignUpService {
    constructor(private httpClient: HttpClient) {

    }

    checkUsernameTaken(username: string) {
        return this.httpClient.get(API + '/user/exists/'+ username);
    }

    signup(newUser: NewUser) {
        return this.httpClient.post(API + '/user/signup', newUser)
    }
}