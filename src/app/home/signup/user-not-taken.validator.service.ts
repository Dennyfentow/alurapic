import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';

import { debounceTime, switchMap, map, first, tap} from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}
    // CASE SENSITIVE EM TODA ESSA DISGRAÇA
    checkUserNameTaken() {

        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(username => // como há dois observables, troca, switch para o checkUsernameTaken, ou seja
                    this.signUpService.checkUsernameTaken(username) // enquanto estou trabalhando aqui, não recebo mais nada até retornar algo
                ))
                .pipe(map(isTaken => isTaken ? {userNameTaken: true}: null )) // mapear para retornar null ou um objeto que é acessado no template
                .pipe(tap(r => console.log(r)))
                .pipe(first()) // pega o primeiro valor e completa o subscribe
        }
    }
}